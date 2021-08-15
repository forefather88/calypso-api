require("dotenv").config();
const { SportType } = require("../const");
const PoolModel = require("../models/pool.model");
const apiSport = require("../network/apiSport");
const pandas = require("../network/pandas");
const poolContract = require("../contracts/poolContract");

// - First check all pools in DB due date without result
// - Get result for those pools from api-sports and pandas
// - Update result to contract synchronously (because nonce should be unique)
module.exports = async () => {
  const current = Date.now() / 1e3;
  console.log("Run update: " + current);
  const endPools = await PoolModel.find({
    endDate: { $lt: current },
    "result.side": { $in: [0, null] },
  });
  await Promise.allSettled(endPools.map(this.updatePoolResult));
  console.log("End update pool result from API");
  const notUpdatePools = await PoolModel.find({
    endDate: { $lt: current },
    "result.side": { $ne: 0 },
    "result.updated": null,
  });
  for (pool of notUpdatePools) {
    try {
      await updateToContract(pool);
      console.log("Done ", pool._id);
    } catch (err) {
      console.log(err);
    }
  }
};

exports.updatePoolResult = async (pool) => {
  const { game, result } = pool;
  const res = await getGameResult(game);
  if (!res) return;
  console.log(res);
  pool.result = { ...result, ...res };
  await pool.save();
};

const getGameResult = (game) => {
  console.log("getGameResult", game.team1, game.team2);
  return new Promise((resolve, reject) => {
    if (game.type === SportType.football) {
      apiSport
        .getResult(game.gameId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    } else if (game.type === SportType.esport) {
      pandas
        .getResult(game.gameId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    } else if (game.type === SportType.nba) {
      pandas
        .getResult(game.gameId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    } else {
      reject();
    }
  });
};

const updateToContract = async (pool) => {
  console.log("updateToContract", pool._id, pool.result.side);
  await poolContract.updateResult(
    pool._id,
    pool.result.side,
    pool.result.g1,
    pool.result.g2,
    pool.version
  );
  pool.result = { ...pool.result, updated: true };
  await pool.save();
};
