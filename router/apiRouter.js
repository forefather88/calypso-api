const express = require("express");
const router = express.Router();
const matchController = require("../controller/match.controller");

router.get("/matches", matchController.getMatches);
router.get("/match", matchController.getMatch);
router.post("/create-pool", matchController.createPool);
router.get("/pool", matchController.getPool);
router.get("/pools", matchController.getPools);
router.get("/bets", matchController.getBets);
router.post("/bettxid", matchController.createBetTxId);
router.post("/affiliate-addr", matchController.affiliateAddrCheck);

module.exports = router;
