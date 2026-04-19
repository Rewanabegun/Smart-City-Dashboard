const mongoose = require("mongoose");

const PollutionSchema = new mongoose.Schema({
  time: String,
  aqi: Number,
});

module.exports = mongoose.model("Pollution", PollutionSchema);