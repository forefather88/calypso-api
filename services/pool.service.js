const { getPool, getBets } = require("../contracts/poolContract");
const PoolModel = require("../models/pool.model");
const BetTxIdModel = require("../models/bettxid.model");

exports.updatePool = async (poolAddress, userAddress) => {
  const pool = (await PoolModel.findOne({ _id: poolAddress })) || {};
  const poolDetail = await getPool(poolAddress, userAddress, pool.version);
  if (poolDetail && poolDetail.claimed) {
    const claimedUsers = pool.claimedUsers || [];
    const containtUsers = claimedUsers
      .map((el) => el.address)
      .includes(userAddress);
    pool.claimedUsers = containtUsers
      ? claimedUsers
      : [
          ...claimedUsers,
          { address: userAddress, claimed: true, reward: poolDetail.reward },
        ];
  }
  const result = poolDetail.result;
  pool.result = {
    ...pool.result,
    side: result.side,
    winOutcome: result.winOutcome,
    winTotal: result.winTotal,
    refund: result.refund,
    poolFeeAmount: result.poolFeeAmount,
    claimedDepositAndFee: result.claimedDepositAndFee,
    updated: result.side != 0 ? true : null,
  };
  pool.betUsers = poolDetail.betUsers;
  pool.total = poolDetail.total;
  pool.maxCap = poolDetail.maxCap;
  pool.depositedCal = poolDetail.depositedCal;
  pool.endDate = poolDetail.endDate;
  const bets = mergeBets([...pool.bets], poolDetail.bets);
  //Since we can't store txId in the blockchain, I've made additional BetTxIdModel to store it, after we place a bet.
  //updatePool takes the txId from BetTxIdModel and puts it in the bet with the same _id inside of the current Pool.
  for (const bet of bets) {
    if (!bet.txId) {
      bet.txId = (await BetTxIdModel.findOne({ _id: bet._id })).txId;
      //We won't need this entry anymore, so we can delete it.
      await BetTxIdModel.remove({ _id: bet._id });
    }
  }
  pool.bets = bets;
  await pool.save();
};

const mergeBets = (oldBets, bets) => {
  if (bets.length === 0) return oldBets;
  const oldBetDates = oldBets.map((el) => Number(el.createdDate));
  const newBets = bets.filter((el) => {
    return !oldBetDates.includes(Number(el.createdDate));
  });
  return [...oldBets, ...newBets];
};
