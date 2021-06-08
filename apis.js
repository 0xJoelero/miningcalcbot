const fetch = require("node-fetch");

export const getReward = () => {
  return fetch("https://api.minerstat.com/v2/coins?list=ETH")
    .then((re) => re.json())
    .then((json) => {
      return json[0];
    })
    .catch((err) => console.log(`err`, err));
};
