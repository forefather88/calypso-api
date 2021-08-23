const { getAllLotteries, getLottery } = require("../contracts/lotteryContract");
const { getLotteryContract } = require("../contracts/getContracts");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const Tx = require("ethereumjs-tx");

module.exports = async () => {
  const allAddrs = await getAllLotteries();

  for (addr of allAddrs) {
    try {
      await drawLottery(addr);
    } catch (err) {
      console.log(err);
    }
  }
};

const drawLottery = async (addr) => {
  const lottery = await getLottery(addr);
  if (
    !lottery.hasDrawn &&
    Date.now() / 1e3 > lottery.endDate &&
    lottery.originalTotalStaked >= lottery.totalPrize
  ) {
    const pub = process.env.PUB;
    const priv = process.env.PRIV;
    web3.eth.getTransactionCount(pub).then((nonce) => {
      var privateKeyHex = Buffer.from(priv, "hex");
      var txData = getLotteryContract(web3, addr)
        .methods.startDraw()
        .encodeABI();
      var rawTx = {
        from: pub,
        to: addr,
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
          console.log(err);
        })
        .once("confirmation", (confNumber, receipt) => {
          console.log(receipt);
          resolve();
        });
    });
  }
};
