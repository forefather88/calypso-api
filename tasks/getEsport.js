const MatchModel = require("../models/game.model");
const { getMatches } = require("../network/pandas");

module.exports = () => {
  getMatches()
    .then((matches) => {
      if (matches && matches.length)
        matches.forEach((match) =>
          MatchModel.updateOne(
            { gameId: match.gameId, type: "esport" },
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
