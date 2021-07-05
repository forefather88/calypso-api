const MatchModel = require("../models/game.model");
const { getMatches } = require("../network/apiSport");

const getFootball = () => {
  getMatches(2020, 40)
    .then((matches) => {
      matches &&
        matches.length &&
        matches.forEach((match) =>
          MatchModel.updateOne(
            { gameId: match.gameId, type: "football" },
            match,
            {
              upsert: true,
            }
          )
            .then(console.log)
            .catch(console.error)
        );
    })
    .catch(console.error);
};
module.exports = getFootball;
