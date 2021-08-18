const MatchModel = require("../models/game.model");
const PoolModel = require("../models/pool.model");
const LotteryModel = require("../models/lottery.model");
const BetTxIdModel = require("../models/bettxid.model");
const UserNameModel = require("../models/userName.model");
const Const = require("../const");
const { updatePool, getBets } = require("../services/pool.service");
const { updateLottery } = require("../services/lottery.service");
const { getTickets } = require("../contracts/lotteryContract");

exports.getMatches = async (req, res) => {
  const currentTime = new Date().getTime() / 1000 + 60 * 60;
  const after2Weeks = currentTime + 60 * 60 * 24 * 14;
  const matches = await MatchModel.find({
    date: { $gt: currentTime, $lt: after2Weeks },
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
  const pools = await PoolModel.find({});
  res.json({ pools });
};

exports.getLotteries = async (req, res) => {
  const lotteries = await LotteryModel.find({});
  res.json({ lotteries });
};

exports.getBets = async (req, res) => {
  const { poolAddress, userAddress } = req.query;
  const bets = await getBets(poolAddress, userAddress);
  res.json({ bets });
};

exports.getTickets = async (req, res) => {
  const { lotteryAddress, userAddress } = req.query;
  const tickets = await getTickets(lotteryAddress, userAddress);
  res.json({ tickets });
};

exports.createPool = (req, res) => {
  const pool = {
    ...req.body,
    createdDate: Math.round(Date.now() / 1e3),
    version: process.env.VERSION,
  };
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

exports.affiliateAddrCheck = async (req, res) => {
  const { addresses } = req.body;
  let validAddrs = [];
  PoolModel.find({}).then((doc) => {
    addresses.forEach((address) => {
      console.log(address);
      address = address.toLowerCase();
      let isValid = !doc.some(
        (el) =>
          el.owner.toLowerCase() == address ||
          el.betUsers.some((bu) => bu.toLowerCase() == address)
      );
      if (isValid) {
        validAddrs.push(address);
      }
    });
    res.json({ validAddrs });
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

exports.getLottery = async (req, res) => {
  const { lotteryAddress } = req.query;
  await updateLottery(lotteryAddress);
  const lottery = await LotteryModel.findOne({ _id: lotteryAddress });
  res.json({ lottery });
};

exports.createUserName = async (req, res) => {
  const { _name, _address } = req.body;
  const md = await UserNameModel.findOne({
    $or: [{ name: _name }, { address: _address }],
  });
  if (md != null) {
    if (md.name != _name) {
      md.name = _name;
      await md.save();
    } else {
      res.status(406).json({
        message: "This name already exists!",
      });
    }
  } else {
    UserNameModel.insertMany([
      { address: _address, name: _name, version: process.env.VERSION },
    ])
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
  }
};

exports.getUserName = async (req, res) => {
  const _address = req.query.address;
  const model = await UserNameModel.findOne({ address: _address });
  const userName = model == null ? "" : model.name;
  res.json({ userName });
};

exports.getUserAddress = async (req, res) => {
  const _name = req.query.name;
  const model = await UserNameModel.findOne({ name: _name });
  const userAddress = model.address;
  res.json({ userAddress });
};
