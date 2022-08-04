if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const path = require("path");

// 환경 변수
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/oneill8";
const secret = process.env.SECRET || "thisshouldbeabettersecret!";
const port = process.env.PORT || 5000;

const app = express();

// 라우터
const placeRoutes = require("./routes/place");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

// 모델
const User = require("./models/user");

// MongoDB 연결
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// 로그인 정보 저장할 session 설정
const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true, // 웹브라우저와 웹서버가 https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 세션 만료 기한 일주일
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: MongoStore.create({ mongoUrl: dbUrl }),
};

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet 세팅
const cspOptions = {
  directives: {
    // 헬멧 기본 옵션 가져오기
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),

    // self: 현재 출처에서는 허용하지만 하위 도메인에서는 허용되지 않음
    // unsafe-inline: 인라인 자바스크립트, 인라인 스타일을 허용
    // unsafe-eval: eval 같은 텍스트-자바스크립트 메커니즘을 허용

    "default-src": ["'self'", "*.kakao.com", "*.pstatic.net", "*.unsplash.com"],

    // 카카오 API 도메인과 인라인 스크립트, eval 허용
    "script-src": ["'self'", "*.kakao.com", "'unsafe-inline'", "'unsafe-eval'"],

    // 네이버 라이브 검색과 Unsplash에서 이미지 소스 허용
    "img-src": ["'self'", "data:", "*.pstatic.net", "*.unsplash.com"],

    // 소스에 https와 http 허용
    "base-uri": ["http:"],
  },
};

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: cspOptions,
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
  );
}

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

// 리액트로 빌드된 파일 보여주기
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

// app.all("*", (req, res, next) => {
//   next(new ExpressError("요청된 URI가 존재하지 않아요!", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = "문제가 생겼어요! 관리자에게 문의하세요!";
//   res.status(statusCode).send(err);
// });

app.listen(port, () => [console.log(`Listening on port ${port}`)]);
