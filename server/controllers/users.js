const User = require("../models/user");
const Review = require("../models/review");

module.exports.login = (req, res) => {
  res.send(req.user.username);
};

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const exUser = await User.findOne({ username });
  const exEmail = await User.findOne({ email });

  if (exUser) {
    res.status(400).send("이미 사용 중인 아이디예요!");
  } else if (exEmail) {
    res.status(400).send("이미 사용 중인 이메일이에요!");
  } else {
    const user = await new User({ username, email });
    await User.register(user, password);
    res.send("회원가입 성공!");
  }
};

module.exports.mypage = async (req, res) => {
  const reviews = await Review.find({ author: req.user._id });
  res.send(reviews);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) res.send(err);
    res.send("로그아웃 완료!");
  });
};
