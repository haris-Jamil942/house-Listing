const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controller/review.js");

//Post rout
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapasync(reviewController.createReview),
);

//Delete review rout
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapasync(reviewController.destroyReview),
);

module.exports = router;
