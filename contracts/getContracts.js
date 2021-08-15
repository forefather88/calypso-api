const BettingPoolAbi_0 = require("./const/BettingPoolAbi_0");
const PoolManagerAbi = require("./const/PoolManagerAbi");
const BettingPoolAbi = [BettingPoolAbi_0];
const LotteryManagerAbi = require("./const/LotteryManagerAbi");
const LotteryAbi = require("./const/LotteryAbi");
exports.getPoolContract = (web3, poolAddress, version = 0) => {
  return new web3.eth.Contract(BettingPoolAbi[version], poolAddress);
};

exports.getPoolManger = (web3, poolManagerAddress) => {
  return new web3.eth.Contract(PoolManagerAbi, poolManagerAddress);
};

exports.getLotteryContract = (web3, lotteryAddress) => {
  return new web3.eth.Contract(LotteryAbi, lotteryAddress);
};

exports.getLotteryManager = (web3, lotteryManagerAddress) => {
  return new web3.eth.Contract(LotteryManagerAbi, lotteryManagerAddress);
};
