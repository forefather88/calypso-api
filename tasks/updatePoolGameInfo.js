const gameModel = require("../models/game.model");
const poolModel = require("../models/pool.model");

const updatePoolGameInfo = async () => {
  const pools = await poolModel.find();
  pools.forEach(async (pool) => {
    const game = await gameModel.findOne({ gameId: pool.game.gameId });
    if (game) {
      pool.game = game;
      pool.save();
    }
  });
};

module.exports = updatePoolGameInfo;
