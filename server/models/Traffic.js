const mongoose = require("mongoose");

const TrafficSchema = new mongoose.Schema({
  location: String,
  density: Number,
  time: String
});

module.exports = mongoose.model("Traffic", TrafficSchema);