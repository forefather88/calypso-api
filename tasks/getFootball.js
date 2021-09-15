const MatchModel = require("../models/game.model");
const { getMatches } = require("../network/apiSport");

const getFootball = () => {
  getMatchesByLeague(39);
  getMatchesByLeague(140);
  getMatchesByLeague(78);
  getMatchesByLeague(135);
};

const getMatchesByLeague = (league) => {
  getMatches(2021, league)
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
            .then(() => console.log)
            .catch(() => console.error)
        );
    })
    .catch(() => console.error);
};

module.exports = getFootball;
