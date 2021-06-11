const MatchModel = require("../models/game.model");
const PoolModel = require("../models/pool.model");
const BetTxIdModel = require("../models/bettxid.model");
const Const = require("../const");
const { updatePool, getBets } = require("../services/pool.service");

exports.getMatches = async (req, res) => {
  const currentTime = new Date().getTime() / 1000 + 60 * 60;
  const afterMonth = currentTime + 60 * 60 * 24 * 30;
  const matches = await MatchModel.find({
    date: { $gt: currentTime, $lt: afterMonth },
  }).sort({ date: 1 });
  res.json({
    matches,
    gameTypes: Object.values(Const.GameType),
  });
};

exports.getMatch = async (req, res) => {
  const { matchId } = req.query;
  const match = await MatchModel.findOne({ _id: matchId });
  res.json({ match });
};

exports.createBetTxId = async (req, res) => {
  BetTxIdModel.insertMany([req.body])
    .then((doc) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json({
        message: "Something wrong",
      });
    });
};

exports.getPools = async (req, res) => {
  console.log(req.ip);
  const pools = await PoolModel.find({});
  res.json({ pools });
};

exports.getBets = async (req, res) => {
  const { poolAddress, userAddress } = req.query;
  const bets = await getBets(poolAddress, userAddress);
  res.json({ bets });
};

exports.createPool = (req, res) => {
  const pool = {
    ...req.body,
    createdDate: Math.round(Date.now() / 1e3),
    version: process.env.VERSION,
  };
  console.log(pool);
  PoolModel.insertMany([pool])
    .then((doc) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json({
        message: "Something wrong",
      });
    });
};

exports.getPool = async (req, res) => {
  const { poolAddress, userAddress } = req.query;
  await updatePool(poolAddress, userAddress);
  PoolModel.findOne({ _id: poolAddress })
    .then((doc) => {
      doc && res.status(200).json(doc);

      !doc &&
        res.status(404).json({
          message: "Not found",
        });
    })
    .catch(() => {
      res.status(404).json({
        message: "Not found",
      });
    });
};
