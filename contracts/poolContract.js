require("dotenv").config();
const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const { getPoolContract, getPoolManger } = require("./getContracts");
const { map } = require("./const/PoolManagerAbi");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const PoolManager = getPoolManger(web3, process.env.POOL_MANAGER);

exports.getPool = async (poolAddress, userAddress, version = 0) => {
  const poolSc = getPoolContract(web3, poolAddress, version);
  const detail1 = poolSc.methods.getPoolDetail().call();
  const detail2 = poolSc.methods.getPoolDetail2().call();
  const info = poolSc.methods.getUserInfo().call({ from: userAddress });
  const bets = getBets(poolSc, userAddress);
  const results = await Promise.all([detail1, detail2, info, bets]);
  const details = {
    ...results[0],
    ...results[1],
    ...results[2],
    bets: results[3],
  };
  return {
    _id: poolAddress,
    owner: details._owner,
    title: details._title,
    description: details._description,
    gameId: details._game.gameId,
    game: details._game.gameType,
    depositedCal: details._depositedCal / 1e18,
    maxCap: details._maxCap / 1e18,
    poolFee: details._poolFee / 100,
    endDate: details._game.endDate,
    createdDate: details._createdDate,
    currency: details._currency,
    isPrivate: details._isPrivate,
    whitelist: details._whitelist,
    total: details._total / 1e18,
    result: {
      side: details._result,
      winOutcome: details._winOutcome / 1e18,
      winTotal: (details._winTotal || 0) / 1e18,
      refund: details._refund / 1e18,
      poolFeeAmount: details._poolFeeAmount / 1e18,
      claimedDepositAndFee: details._claimedDepositAndFee,
    },
    betUsers: details._betUsers,
    claimed: details._claimed,
    reward: details._reward / 1e18,
    bets: details.bets,
    minBet: details.minBet,
    minPoolSize: details.minPoolSize,
  };
};

const getBets = async (poolSc, userAddress) => {
  let betIds = [];
  try {
    betIds = await poolSc.methods.getBetIdsOf().call({ from: userAddress });
  } catch (err) {
    console.log(err);
  }

  const bets = await Promise.all(
    betIds.map((el) => poolSc.methods.getBet(el).call())
  );

  const mapBets = bets.map((el) => ({
    _id: el.betId,
    bettor: el._bettor,
    side: el._side,
    amount: el._amount / 1e18,
    createdDate: el._createdDate,
  }));
  return mapBets;
};

exports.updateResult = (poolAddress, result, g1, g2, version = 0) => {
  return new Promise((resolve, reject) => {
    const pub = process.env.PUB;
    const priv = process.env.PRIV;
    web3.eth.getTransactionCount(pub).then((nonce) => {
      var privateKeyHex = Buffer.from(priv, "hex");
      var poolSc = getPoolContract(web3, poolAddress, version);
      var txData = poolSc.methods.setResult(result, g1, g2).encodeABI();
      console.log(process.env.CHAIN_ID);
      var rawTx = {
        from: pub,
        to: poolAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(30e9),
        gasLimit: web3.utils.toHex(1e6),
        value: web3.utils.toHex(0),
        data: txData,
        chainId: Number(process.env.CHAIN_ID),
      };
      var tx = new Tx.Transaction(rawTx, { chain: process.env.CHAIN });
      tx.sign(privateKeyHex);
      var serializedTx = tx.serialize();
      web3.eth
        .sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .on("transactionHash", (hash) => {
          console.log(`>>> Start >>>>>>>> ${pub} >>>>>>>${hash}`);
        })
        .on("error", (err) => {
          console.log(`--------- ERROR ----- ${pub}`);
          reject(String(err));
        })
        .once("confirmation", (confNumber, receipt) => {
          console.log(`--------- Confirm ${receipt}`);
          resolve();
        });
    });
  });
};

exports.getAllPools = () => {
  return new Promise((resolve, reject) => {
    PoolManager.methods
      .getAllPool()
      .call()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
