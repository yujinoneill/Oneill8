const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const Place = require("./models/place");

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

app.get("/api", async (req, res) => {
  const places = await Place.find({});
  res.send(places);
});

app.post("/api/login", (req, res) => {
  res.send("로그인 성공!");
});

app.post("/api/register", (req, res) => {
  res.send("회원가입 완료!");
});

app.get("/api/place/:id", async (req, res) => {
  const place = await Place.findById(req.params.id).populate("reviews");
  res.send(place);
});

app.post("/api/place/new", async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.send("등록 완료!");
});

app.listen(5000, () => [console.log("Listening on port 5000")]);
