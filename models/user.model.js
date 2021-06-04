const mongoose = require("mongoose");

const Model = new mongoose.Schema({
  address: String,
  createdPools: [String],
  bettedPools: [String],
});

module.exports = mongoose.model("user", Model);
