const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rate: String,
  review: String,
  date: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
