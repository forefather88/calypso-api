const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  _id: String,
  txId: String,
});
module.exports = mongoose.model("bettxid", Schema);
