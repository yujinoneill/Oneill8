const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// 모델
const Place = require("./models/place");
const User = require("./models/user");
const Review = require("./models/review");

// MongoDB 연결
mongoose.connect("mongodb://localhost:27017/oneill8");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// 로그인 정보 저장할 session 설정
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 세션 만료 기한 일주일
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport 세팅
const passport = require("passport");
const LocalStrategy = require("passport-local"); // 로컬 방식으로 인증

app.use(passport.initialize()); // Passport를 사용한다고 express에게 알림(passport 초기화)
app.use(passport.session()); // session 이용해서 passport 사용
passport.use(User.createStrategy()); // LocalStrategy 인스턴스 만듬 ( 로그인 방식을 local로 하겠다) -> createStrategy()는 이미 구성 된 passport-local의 LocalStrategy를 생성

passport.serializeUser(User.serializeUser()); // 로그인에 성공했을 때 유저 정보를 session에 저장하는 기능
passport.deserializeUser(User.deserializeUser()); // session에 있는 사용자의 식별자를 받아서 DB에 조회

// 미들웨어
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("로그인이 필요해요!");
  }
  next();
};

const isOneill = (req, res, next) => {
  if (!req.user.username === "oneill") {
    return res.status(403).send("관리자 권한이 필요해요!");
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (review.author !== req.user._id) {
    return res.status(403).send("리뷰 작성자만이 할 수 있는 일이에요!");
  }
  next();
};

app.get("/api", async (req, res) => {
  const places = await Place.find({});
  res.send(places);
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user.username);
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const exUser = await User.findOne({ username });
  const exEmail = await User.findOne({ email });

  if (exUser) {
    res.status(400).send("이미 사용 중인 아이디예요!");
  } else if (exEmail) {
    res.status(400).send("이미 사용 중인 이메일이에요!");
  } else {
    const user = await new User({ username, email });
    User.register(user, password)
      .then((res) => {
        res.send("회원가입 성공!");
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.get("/api/mypage", isLoggedIn, async (req, res) => {
  const reviews = await Review.find({ author: req.user._id });
  res.send(reviews);
});

app.post("/api/place/new", isOneill, async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.send("맛집 등록 완료!");
});

app.get("/api/place/:id", async (req, res) => {
  const place = await Place.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  res.send(place);
});

app.put("/api/place/:id/edit", isOneill, async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body });
  res.send("맛집 수정 완료!");
});

app.delete("/api/place/:id", isOneill, async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.send("맛집 삭제 완료!");
});

app.post("/api/place/:id/reviews", isLoggedIn, async (req, res) => {
  const place = await Place.findById(req.params.id);
  const review = new Review(req.body);
  review.author = req.user._id;
  place.reviews.unshift(review);
  await review.save();
  await place.save();
  res.send("리뷰 등록 완료!");
});

app.delete(
  "/api/place/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  async (req, res) => {
    const { id, reviewId } = req.params;
    await Place.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.send("리뷰 삭제 완료!");
  }
);

app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) res.send(err);
    res.send("로그아웃 완료!");
  });
});

app.listen(5000, () => [console.log("Listening on port 5000")]);
