const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  placeName: String,
  roadAddress: String,
  desc: String,
  image: String,
  lat: Number,
  lng: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Place", PlaceSchema);
