const { ZeroAddress } = require("../const");
const { getAllPools, getPool } = require("../contracts/poolContract");
const PoolModel = require("../models/pool.model");
const MatchModel = require("../models/game.model");

// Get all pool addresses from PoolManager
// Check all pools not existed in DB
// Update pool detail from SC to DB
module.exports = async () => {
  const allAddrs = await getAllPools();
  const savedPools = await PoolModel.find({});
  const savedPoolIds = savedPools.map((el) => el._id);
  const notSavedAddrs = allAddrs.filter((el) => !savedPoolIds.includes(el));
  notSavedAddrs.forEach(syncPool);
};

const syncPool = async (addr) => {
  const poolDetail = await getPool(addr, ZeroAddress);
  const { game, gameId } = poolDetail;
  const match = await MatchModel.findOne({ gameId, game });
  const pool = {
    _id: addr,
    owner: poolDetail.owner,
    title: poolDetail.title,
    description: poolDetail.description,
    game: {
      gameId: gameId,
      team1: match.team1,
      logo1: match.logo1,
      team2: match.team2,
      logo2: match.logo2,
      type: match.type,
      game: match.game, //epl, seriea, dota, lol,..
      gameLogo: match.gameLogo,
      tour: match.tour,
      tourLogo: match.tourLogo,
      date: match.date,
    },
    depositedCal: poolDetail.depositedCal,
    maxCap: poolDetail.maxCap,
    poolFee: poolDetail.poolFee,
    endDate: poolDetail.endDate,
    createdDate: poolDetail.createdDate,
    currency: poolDetail.currency,
    isPrivate: poolDetail.isPrivate,
    whitelist: poolDetail.whitelist,
    total: poolDetail.total,
    result: poolDetail.result,
    betUsers: poolDetail.betUsers,
    isUnlimited: poolDetail.isUnlimited,
  };
  await PoolModel.insertMany([pool]);
  console.log("Done insert", addr);
};
