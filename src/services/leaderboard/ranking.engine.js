export const rankPlayers = (players) => {
  return players.sort((a, b) => a.bestPrice - b.bestPrice);
};
