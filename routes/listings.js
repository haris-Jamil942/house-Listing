const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateError } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(listingController.index)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateError,
    wrapasync(listingController.createListing),
  );

// new rout
router.get("/create", isLoggedIn, listingController.createFormRndering);

router
  .route("/:id")
  .get(wrapasync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateError,
    wrapasync(listingController.updateListing),
  )
  .delete(isOwner, isLoggedIn, wrapasync(listingController.destroyRoute));

// edit rout
router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn,
  wrapasync(listingController.editFormRendering),
);

module.exports = router;
