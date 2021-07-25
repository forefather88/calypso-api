const mongoose = require("mongoose");

const Model = new mongoose.Schema({
  address: String,
  name: String,
});

module.exports = mongoose.model("userName", Model);
