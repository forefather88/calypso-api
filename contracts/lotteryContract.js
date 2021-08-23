require("dotenv").config();
const Web3 = require("web3");
const { getLotteryContract, getLotteryManager } = require("./getContracts");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const LotteryManager = getLotteryManager(web3, process.env.LOTTERY_MANAGER);

exports.getLottery = async (lotteryAddress) => {
  const lotterySc = getLotteryContract(web3, lotteryAddress);
  const details = lotterySc.methods.getLotteryDetail().call();
  const details2 = lotterySc.methods.getLotteryDetail2().call();
  const prizes = lotterySc.methods.getWinners().call();
  const promises = await Promise.all([details, prizes, details2]);
  const results = {
    ...promises[0],
    ...promises[1],
    ...promises[2],
    ...promises[3],
  };
  return {
    _id: lotteryAddress,
    owner: results._owner,
    hasDrawn: results._hasDrawn,
    createdDate: results._createdDate,
    endDate: results._endDate,
    lotteryManagerAddress: results._lotteryManagerAddress,
    totalTickets: results._totalTickets,
    originalTotalStaked: results._originalTotalStaked, // / 1e18,
    totalPrize: results._totalPrize,
    playersAmount: results._playersAmount,
    usersClaimedPrize: results._usersClaimedPrize,
    totalStaked: results._totalStaked,
    firstPrize: results._firstPrize,
    secondPrize: results._secondPrize,
    thirdPrize: results._thirdPrize,
    match4: results._match4,
    match3: results._match3,
    match2: results._match2,
    match1: results._match1,
    usersClaimedStake: results._usersClaimedStake,
    stakersAddresses: results._stakersAddresses,
    stakingAmounts: results._stakingAmounts,
    winNumber: results._winNumber,
  };
};

exports.getAllLotteries = () => {
  return new Promise((resolve, reject) => {
    LotteryManager.methods
      .getAllLotteries()
      .call()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

exports.getTickets = async (lotteryAddress, userAddress) => {
  const lotterySc = getLotteryContract(web3, lotteryAddress);
  const _tickets = await lotterySc.methods
    .getTicketsOfPlayer()
    .call({ from: userAddress });
  return { tickets: _tickets };
};
