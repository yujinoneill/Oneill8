const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// 라우터
const placeRoutes = require("./routes/place");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

// 모델
const User = require("./models/user");

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

app.use("/api", userRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/place/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("Home");
});

app.all("*", (req, res) => {
  res.send(new ExpressError("Page Not Found", 404));
});

app.listen(5000, () => [console.log("Listening on port 5000")]);
