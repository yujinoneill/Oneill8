const express = require("express");
const router = express.Router();
const catchAsync = require("../error/catchAsync");

// 컨트롤러
const places = require("../controllers/places");

const { isOneill } = require("../middleware");

router.get("/", catchAsync(places.index));

router.post("/new", isOneill, catchAsync(places.createPlace));

router.get("/:id", catchAsync(places.showPlace));

router.put("/:id/edit", isOneill, catchAsync(places.updatePlace));

router.delete("/:id", isOneill, catchAsync(places.deletePlace));

module.exports = router;
