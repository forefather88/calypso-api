const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  _id: String,
  owner: String,
  version: Number,
  title: String,
  description: String,
  game: {
    gameId: String,
    team1: String,
    logo1: String,
    team2: String,
    logo2: String,
    type: { type: String }, //football, esport
    game: String, //epl, seriea, dota, lol,..
    gameLogo: String,
    tour: String,
    tourLogo: String,
    date: Number,
    link: String,
  },
  depositedCal: Number,
  maxCap: Number,
  minBet: Number,
  poolFee: Number,
  endDate: Number,
  handicap: { result: Number, value: Number },
  createdDate: Number,
  resultDate: Number,
  currency: String,
  isPrivate: Boolean,
  whitelist: [String],
  bets: [
    {
      _id: String,
      bettor: String,
      side: Number,
      amount: Number,
      createdDate: Number,
      txId: String,
    },
  ],
  total: Number,
  claimedUsers: [
    {
      address: String,
      claimed: Boolean,
      reward: Number,
    },
  ],

  betUsers: [String],
  result: {
    side: Number, // 1: team1, 2: team2, 3: draw
    g1: Number,
    g2: Number,
    updated: Boolean,
    winOutcome: Number,
    winTotal: Number,
    poolFeeAmount: Number,
    claimedDepositAndFee: Boolean,
    affiliates: [
      {
        address: String,
        award: Number,
      },
    ],
  },
});
module.exports = mongoose.model("pool", Schema);
