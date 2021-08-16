require("dotenv").config();
const moment = require("moment");
const { SportType, BetSides } = require("../const");
const network = require("./network");
const host = process.env.NBA_HOST;

const apiNba = {
  headers: {
    "x-rapidapi-key": process.env.NBA_KEY,
  },
  getFixturesUrl: host + "games/seasonYear/",
  getMatch: host + "games/gameId/",
};

exports.getMatches = (year) => {
  return new Promise((resolve, reject) => {
    network
      .get(apiNba.getFixturesUrl + year, {}, apiNba.headers)
      .then((res) => {
        const response = res.data;
        const matches = response.api.games.map((item) => {
          const home = item.hTeam;
          const away = item.vTeam;
          return {
            gameId: String(item.gameId),
            team1: home.fullName,
            logo1: home.logo,
            team2: away.fullName,
            logo2: away.logo,
            status: item.statusGame,
            date: moment(item.startTimeUTC).unix(),
            type: SportType.nba,
            game: "nba",
            gameLogo: "",
            link: "",
          };
        });
        resolve(matches);
      })
      .catch((err) => reject(err));
  });
};

exports.getResult = async (matchId) => {
  const res = await network.get(apiNba.getMatch + matchId, {}, apiNba.headers);
  const response = res.data.api && res.data.api.games;
  const match = response && response.length && response[0];
  const status = match.statusGame;
  const matchFinished = status == "Finished";
  if (matchFinished) {
    const home = match.hTeam;
    const away = match.vTeam;
    const homeScore = home.score.points;
    const awayScore = away.score.points;
    const side =
      homeScore > awayScore
        ? BetSides.team1
        : homeScore < awayScore
        ? BetSides.team2
        : BetSides.draw;
    return { side, g1: homeScore, g2: awayScore };
  }
  return {};
};
