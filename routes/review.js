const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../error/catchAsync");

// 컨트롤러
const reviews = require("../controllers/reviews");

const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
