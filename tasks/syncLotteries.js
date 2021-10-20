const { getAllLotteries, getLottery } = require("../contracts/lotteryContract");
const LotteryModel = require("../models/lottery.model");

module.exports = async () => {
  const allAddrs = await getAllLotteries();
  const savedLotteries = await LotteryModel.find({});
  const savedLotteryIds = savedLotteries.map((el) => el._id);
  const notSavedAddrs = allAddrs.filter((el) => !savedLotteryIds.includes(el));

  await Promise.all(notSavedAddrs.map((el) => syncLottery(el)));
  await Promise.all(savedLotteryIds.map((el) => updateLottery(el)));
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
    poolSize: lotteryDetail.poolSize,
    playersAmount: lotteryDetail.playersAmount,
    totalPrize: lotteryDetail.totalPrize,
    usersClaimedPrize: lotteryDetail.usersClaimedPrize,
  };
  await LotteryModel.insertMany([lottery]);
  console.log("Done insert", addr);
};

const updateLottery = async (lotteryAddress) => {
  const lottery = (await LotteryModel.findOne({ _id: lotteryAddress })) || {};
  const lotteryDetail = await getLottery(lotteryAddress);
  lottery.totalTickets = lotteryDetail.totalTickets;
  lottery.playersAmount = lotteryDetail.playersAmount;
  lottery.hasDrawn = lotteryDetail.hasDrawn;
  lottery.totalPrize = lotteryDetail.totalPrize;
  lottery.usersClaimedPrize = lotteryDetail.usersClaimedPrize;
  lottery.firstPrize = lotteryDetail.firstPrize;
  lottery.secondPrize = lotteryDetail.secondPrize;
  lottery.thirdPrize = lotteryDetail.thirdPrize;
  lottery.match4 = lotteryDetail.match4;
  lottery.match3 = lotteryDetail.match3;
  lottery.match2 = lotteryDetail.match2;
  lottery.match1 = lotteryDetail.match1;
  lottery.endDate = lotteryDetail.endDate;
  lottery.winNumber = lotteryDetail.winNumber;
  lottery.poolSize = lotteryDetail.poolSize;
  await lottery.save();
};
