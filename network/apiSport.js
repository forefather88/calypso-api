require("dotenv").config();
const { BetSides, SportType } = require("../const");
const network = require("./network");
const host = process.env.API_HOST;

const apiSport = {
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
  },
  getFixturesUrl: host + "fixtures",
};

exports.getMatches = (season, league) => {
  let gameType;
  switch (league) {
    case 39:
      gameType = "epl";
      break;
    case 140:
      gameType = "laliga";
      break;
    case 78:
      gameType = "bundesliga";
      break;
    case 135:
      gameType = "italiaseriea";
      break;
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    network
      .get(
        apiSport.getFixturesUrl,
        {
          season,
          league,
        },
        apiSport.headers
      )
      .then((res) => {
        const { response } = res.data;
        const matches = response.map((item) => {
          const home = item.teams.home;
          const away = item.teams.away;
          return {
            gameId: String(item.fixture.id),
            team1: home.name,
            logo1: home.logo,
            team2: away.name,
            logo2: away.logo,
            status: item.fixture.status.short,
            date: item.fixture.timestamp,
            type: SportType.football,
            game: gameType,
            gameLogo: "https://media.api-sports.io/football/leagues/39.png",
            link: "https://www.premierleague.com/fixtures",
          };
        });
        resolve(matches);
      })
      .catch((err) => reject(err));
  });
};

exports.getResult = async (matchId) => {
  const res = await network.get(
    apiSport.getFixturesUrl,
    { id: matchId },
    apiSport.headers
  );
  const response = res.data && res.data.response;
  const match = response && response.length && response[0];
  const status = match.fixture.status.short;
  const matchFinished = ["FT", "AET", "PEN"].includes(status);
  const goals = match && match.goals;
  if (goals && goals.home != null && goals.away != null && matchFinished) {
    const side =
      goals.home > goals.away
        ? BetSides.team1
        : goals.home < goals.away
        ? BetSides.team2
        : BetSides.draw;
    return { side, g1: goals.home, g2: goals.away };
  }
  return {};
};
