const Place = require("../models/place");

module.exports.index = async (req, res) => {
  const places = await Place.find({});
  res.send(places);
};

module.exports.createPlace = async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.send("맛집 등록 완료!");
};

module.exports.showPlace = async (req, res) => {
  const place = await Place.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  res.send(place);
};

module.exports.updatePlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body });
  res.send("맛집 수정 완료!");
};

module.exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.send("맛집 삭제 완료!");
};
