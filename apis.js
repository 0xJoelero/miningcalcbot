const { ETHERSCAN_APIKEY } = require("./environment");
const fetch = require("node-fetch");

export async function getReward() {
  const url = "https://api.minerstat.com/v2/coins?list=ETH";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error("fetch failed", err);
  }
}

export async function getEthPrice() {
  const etherScanUrl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_APIKEY}`;

  try {
    const response = await fetch(etherScanUrl);
    return response.json();
  } catch (err) {
    console.error("fetch failed", err);
  }
}
