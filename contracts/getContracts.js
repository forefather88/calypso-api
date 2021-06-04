const BettingPoolAbi_0 = require("./const/BettingPoolAbi_0");
const PoolManagerAbi = require("./const/PoolManagerAbi");
const BettingPoolAbi = [BettingPoolAbi_0];
exports.getPoolContract = (web3, poolAddress, version = 0) => {
  return new web3.eth.Contract(BettingPoolAbi[version], poolAddress);
};

exports.getPoolManger = (web3, poolManagerAddress) => {
  return new web3.eth.Contract(PoolManagerAbi, poolManagerAddress);
};
