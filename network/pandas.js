require("dotenv").config();
const moment = require("moment");
const { SportType, BetSides } = require("../const");
const network = require("./network");
const host = process.env.PANDAS;

const pandas = {
  headers: {
    Authorization: "Bearer " + process.env.PANDAS_TOKEN,
  },
  getFixturesUrl: host + "matches/upcoming",
  getMatch: host + "matches/",
};

exports.getMatches = () => {
  return new Promise((resolve, reject) => {
    network
      .get(pandas.getFixturesUrl, {}, pandas.headers)
      .then((res) => {
        const response = res.data;
        const matches = response
          .filter((el) => el.opponents && el.opponents.length >= 2)
          .map((item) => {
            const { videogame, league, opponents, streams } = item;
            return {
              gameId: String(item.id),
              team1: opponents[0].opponent.name,
              logo1: opponents[0].opponent.image_url,
              team2: opponents[1].opponent.name,
              logo2: opponents[1].opponent.image_url,
              status: "NS",
              date: moment(item.scheduled_at).unix(),
              type: SportType.esport,
              game: videogame.name.toLowerCase(),
              tour: league.name,
              tourLogo: league.image_url,
              link: streams && streams.official && streams.official.raw_url,
            };
          });
        resolve(matches);
      })
      .catch((err) => reject(err));
  });
};

exports.getResult = async (matchId) => {
  const res = await network.get(pandas.getMatch + matchId, {}, pandas.headers);
  const match = res && res.data;
  const results = match.results;
  const teams = match.opponents;
  const team1Id = teams[0].opponent.id;
  const goal1 = results.find((el) => el.team_id == team1Id);
  const goal2 = results.find((el) => el.team_id != team1Id);
  if (
    goal1 &&
    goal2 &&
    goal1.score != null &&
    goal2.score != null &&
    match.end_at &&
    match.end_at != ""
  ) {
    const side =
      goal1.score > goal2.score
        ? BetSides.team1
        : goal1.score < goal2.score
        ? BetSides.team2
        : BetSides.draw;
    return { side, g1: goal1.score, g2: goal2.score };
  }
  return {};
};
