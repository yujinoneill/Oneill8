const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  username: String,
  rate: Number,
  comment: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
