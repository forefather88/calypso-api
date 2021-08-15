const { getLottery } = require("../contracts/lotteryContract");
const LotteryModel = require("../models/lottery.model");

exports.updateLottery = async (lotteryAddress) => {
  const lottery = (await LotteryModel.findOne({ _id: lotteryAddress })) || {};
  const lotteryDetail = await getLottery(lotteryAddress);
  lottery.totalTickets = lotteryDetail.totalTickets;
  lottery.originalTotalStaked = lotteryDetail.originalTotalStaked;
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
  lottery.totalStaked = lotteryDetail.totalStaked;
  lottery.usersClaimedStake = lotteryDetail.usersClaimedStake;
  lottery.stakersAddresses = lotteryDetail.stakersAddresses;
  lottery.stakingAmounts = lotteryDetail.stakingAmounts;
  await lottery.save();
};
