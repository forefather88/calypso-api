const MatchModel = require("../models/game.model");
const { getMatches } = require("../network/apiNba");

const getNba = () => {
  getMatches(2020)
    .then((matches) => {
      matches &&
        matches.length &&
        matches.forEach((match) =>
          MatchModel.updateOne({ gameId: match.gameId, type: "nba" }, match, {
            upsert: true,
          })
            .then(console.log)
            .catch(console.error)
        );
    })
    .catch(console.error);
};
module.exports = getNba;
