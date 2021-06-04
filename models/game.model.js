const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  gameId: String,
  team1: String,
  logo1: String,
  team2: String,
  logo2: String,
  status: String,
  type: String, //football, esport
  game: String, //epl, seriea, dota, lol,..
  gameLogo: String,
  tour: String,
  tourLogo: String,
  date: Number,
  link: String,
});
module.exports = mongoose.model("game", Schema);
