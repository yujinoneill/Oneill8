const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", (req, res) => {
  res.send("로그인 성공!");
});

app.post("/api/register", (req, res) => {
  res.send("회원가입 완료!");
});

app.get("/api/places/:id", (req, res) => {});

app.listen(5000, () => [console.log("Listening on port 5000")]);
