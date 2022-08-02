const express = require("express");
const router = express.Router();

// 컨트롤러
const places = require("../controllers/places");

const { isOneill } = require("../middleware");

router.get("/", places.index);

router.post("/new", isOneill, places.createPlace);

router.get("/:id", places.showPlace);

router.put("/:id/edit", isOneill, places.updatePlace);

router.delete("/:id", isOneill, places.deletePlace);

module.exports = router;
