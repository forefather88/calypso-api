const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  _id: String,
  owner: String,
  hasDrawn: Boolean,
  createdDate: Number,
  endDate: Number,
  lotteryManagerAddress: String,
  totalTickets: Number,
  originalTotalStaked: Number,
  playersAmount: Number,
  totalPrize: Number,
  totalStaked: Number,
  firstPrize: [String],
  secondPrize: [String],
  thirdPrize: [String],
  match4: [String],
  match3: [String],
  match2: [String],
  match1: [String],
  usersClaimedPrize: [String],
  usersClaimedStake: [String],
  stakersAddresses: [String],
  stakingAmounts: [Number],
});
module.exports = mongoose.model("lottery", Schema);