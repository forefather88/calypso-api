const { getAllLotteries, getLottery } = require("../contracts/lotteryContract");
const LotteryModel = require("../models/lottery.model");

module.exports = async () => {
  const allAddrs = await getAllLotteries();
  const savedLotteries = await LotteryModel.find({});
  const savedLotteryIds = savedLotteries.map((el) => el._id);
  const notSavedAddrs = allAddrs.filter((el) => !savedLotteryIds.includes(el));
  for (const el of notSavedAddrs) {
    await syncLottery(el);
  }
};

const syncLottery = async (addr) => {
  const lotteryDetail = await getLottery(addr);
  const lottery = {
    _id: addr,
    owner: lotteryDetail.owner,
    hasDrawn: lotteryDetail.hasDrawn,
    createdDate: lotteryDetail.createdDate,
    endDate: lotteryDetail.endDate,
    lotteryManagerAddress: lotteryDetail.lotteryManagerAddress,
    totalTickets: lotteryDetail.totalTickets,
    originalTotalStaked: lotteryDetail.originalTotalStaked,
    playersAmount: lotteryDetail.playersAmount,
    totalPrize: lotteryDetail.totalPrize,
    usersClaimedPrize: lotteryDetail.usersClaimedPrize,
    totalStaked: lotteryDetail._totalStaked,
    usersClaimedStake: lotteryDetail._usersClaimedStake,
    stakersAddresses: lotteryDetail._stakersAddresses,
    stakingAmounts: lotteryDetail._stakingAmounts,
  };
  await LotteryModel.insertMany([lottery]);
  console.log("Done insert", addr);
};
