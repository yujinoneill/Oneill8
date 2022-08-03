const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("로그인이 필요해요!");
  }
  next();
};

module.exports.isOneill = (req, res, next) => {
  if (!req.user.username === "oneill") {
    return res.status(403).send("관리자 권한이 필요해요!");
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (String(review.author) !== String(req.user._id)) {
    return res.status(403).send("리뷰 작성자만이 할 수 있는 일이에요!");
  }
  next();
};
