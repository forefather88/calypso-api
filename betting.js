const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const logger = require("morgan");
const apiRouter = require("./router/apiRouter");
const cors = require("cors");
const cron = require("node-cron");
const updateResult = require("./tasks/updateResult");
const fetchEsport = require("./tasks/getEsport");
const syncPools = require("./tasks/syncPools");
const syncLotteries = require("./tasks/syncLotteries");
const drawLotteries = require("./tasks/drawLotteries");
const updatePoolGameInfo = require("./tasks/updatePoolGameInfo");
const getFootball = require("./tasks/getFootball");
const getNba = require("./tasks/getNba");

require("dotenv").config();
require("mongoose").connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.static(path.join(__dirname, "prod")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

if (process.env.ENV === "PROD") {
  // Every 10 min
  cron.schedule("0 */10 * * * *", () => {
    updateResult();
  });

  // Every 4 hours
  cron.schedule("0 0 */4 * * *", () => {
    getNba();
  });

  // Every 4 hours
  cron.schedule("0 0 */4 * * *", () => {
    fetchEsport();
  });

  // Every 4 hours
  cron.schedule("0 0 */4 * * *", () => {
    getFootball();
  });

  // Once a day
  cron.schedule("0 0 2 * * *", () => {
    updatePoolGameInfo();
  });

  //Every 2 hours
  cron.schedule("0 0 */2 * * *", () => {
    syncPools();
  });

  //Every minute
  //cron.schedule("0 */1 * * * *", () => {
  // syncLotteries();
  //});

  //Should be every 30 mins after testing
  //cron.schedule("0 */30 * * * *", () => {
  // drawLotteries();
  //});
}

app.use("/api", apiRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "prod", "index.html"));
});

const port = "4000";

app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

server.on("listening", onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
