const express = require("express");
const router = express.Router({ mergeParams: true });

// 컨트롤러
const reviews = require("../controllers/reviews");

const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, reviews.createReview);

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;
