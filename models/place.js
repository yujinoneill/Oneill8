const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose;

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

PlaceSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Place", PlaceSchema);
