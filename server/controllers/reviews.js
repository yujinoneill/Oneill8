const Place = require("../models/place");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const place = await Place.findById(req.params.id);
  const review = new Review(req.body);
  review.author = req.user._id;
  place.reviews.unshift(review);
  await review.save();
  await place.save();
  res.send("리뷰 등록 완료!");
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Place.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.send("리뷰 삭제 완료!");
};
