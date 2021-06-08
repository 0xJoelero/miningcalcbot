const { Telegraf } = require("telegraf");
const { getReward } = require("./apis");

const bot = new Telegraf("1639665226:AAFvKh5kZWiW2JIEFP0RBroyPrDrUZA_P3U");
let ethCurrentRate;

const ethRate = () => {
  getReward().then((re) => {
    ethCurrentRate = re.price;
  });
};
const convertExponentialToDecimal = (exponentialNumber) => {
  const str = exponentialNumber.toString();
  if (str.indexOf("e") !== -1) {
    const exponent = 24;
    const result = exponentialNumber.toFixed(exponent);
    return result;
  } else {
    return exponentialNumber;
  }
};

const calculateRevenue = () => {
  return getReward().then((e) => {
    let gpuHashrate = Number(55000000); //TODO: get from any api or .json and from user insert with command
    let reward = e.reward * 24;
    let rewardPerDay = convertExponentialToDecimal(reward);
    return convertExponentialToDecimal(rewardPerDay * gpuHashrate);
  });
};

//TODO: add a function to calculate roi

bot.start((ctx) => {
  ethRate();
  ctx.reply(
    "Welcome to MiningCalc Bot, this is a bot to calculate ROI of GPU investments"
  );
});

bot.command("5700", (ctx) => {
  ctx.reply("Ahora inserte el costo de la GPU en dolares: ");
});

bot.on("text", (ctx) => {
  ethRate();
  calculateRevenue().then((e) => {
    let monthlyRevenueInUsd = parseFloat(e) * parseFloat(ethCurrentRate);
    let monthlyRevenueInUsdConverted =
      convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
    let gpuRoi =
      Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);

    ctx.reply(`The ROI is: ${gpuRoi}`); //TODO: convert to 2 decimal number
  });
});

bot.launch();
