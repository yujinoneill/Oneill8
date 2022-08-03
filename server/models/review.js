const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rate: String,
  review: String,
  date: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
