const { getPool, getBets } = require("../contracts/poolContract");
const PoolModel = require("../models/pool.model");

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
