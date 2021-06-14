const { Telegraf } = require("telegraf");
const { getReward, getEthPrice } = require("./apis");
const { selectGpuButtons } = require("./buttons");
const { TELEGRAM_TOKEN } = require("./environment");

const bot = new Telegraf(TELEGRAM_TOKEN);

let ethCurrentRate;
let currentReward;
let revenueResult;
let gpuSelected;
let gpuHashpower;
let gpuMHS;
let gpuWatts;
// Inline buttons to select the GPUs

// Options to set markdown in messasges
const opts = {
  reply_markup: {},
  parse_mode: "Markdown",
};

// Function to get the ETH price
const ethRate = async () => {
  const res = await getEthPrice();
  ethCurrentRate = res.result.ethusd;
};

// Function to get the current block reward
const rewardResult = async () => {
  const res = await getReward();
  currentReward = res[0].reward;
};

// Function to convert exponential number to decimal number
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

// Function to calculate the revenue
const calculateRevenue = ({ hashpower }) => {
  let gpuHashrate = Number(hashpower);
  let reward = currentReward * 24;
  let rewardPerDay = convertExponentialToDecimal(reward);
  return (revenueResult = convertExponentialToDecimal(
    rewardPerDay * gpuHashrate
  ));
};

// Start the bot and welcome message
bot.start((ctx) => {
  ctx.reply(
    `Hi ${ctx.chat.first_name} I'm @miningcalcbot. I'm a bot that calculate *ROI of GPU investments on Ethereum mining farms.*
    \n*The supported GPUS are:*
⛏RX5700XT
⛏RX5550XT
⛏RX580 8GB
⛏RX570 8GB
⛏RTX3070
⛏RTX3080
⛏GTX1660S
    \n⚠️ For now the ROI is calculated without costs of electric energy\n⚠️ Use at your own risks
    \n*Commands:*
    \n⛏ /help -> For consult how to use the bot.\n⛏ /calculateRoi -> Return a list of GPUs. Select one and insert the cost in USD to calculate the months for break even.
    \n\n*Author:* @joelero \n*GitHub Repo:* https://github.com/joelperedaok/miningcalcbot`,
    opts
  );
});

bot.command("help", (ctx) => {
  ctx.reply(
    `
    \n*The supported GPUS are:*
⛏RX5700XT
⛏RX5550XT
⛏RX580 8GB
⛏RX570 8GB
⛏RTX3070
⛏RTX3080
⛏GTX1660S
    \n⚠️ For now the ROI is calculated without costs of electric energy\n⚠️ Use at your own risks
    \n*Commands:*
    \n⛏ /help -> For consult how to use the bot.\n⛏ /calculateRoi -> Return a list of GPUs. Select one and insert the cost in USD to calculate the months for break even.
    \n\n*Author:* @joelero \n*GitHub Repo:* https://github.com/joelperedaok/miningcalcbot`,
    opts
  );
});

// Declare /calculateRoi command, return the inline buttons
bot.command("calculateRoi", (ctx) => {
  let roiWelcome = `*Select a GPU to calculate the break even ⤵*`;
  bot.telegram.sendMessage(ctx.chat.id, roiWelcome, {
    reply_markup: {
      inline_keyboard: selectGpuButtons,
    },
    parse_mode: "Markdown",
  });
});

bot.action("570", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX570 8GB* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("580", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX580 8GB* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("5500", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    "*GPU RX5500XT 8GB* \nNow please send the cost in USD of  ⤵",
    opts
  );
});

bot.action("5600", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX5600* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("5700", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX5700XT* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("6700XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX6700XT* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("6800XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX6800XT* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("1080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 1080* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("1080Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 1080Ti* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("1660s", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU GTX1660S* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("2060", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 2060* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("2070", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 2070* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("2080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 2080* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("2080Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 2080Ti* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("3060", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 3060* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("3060Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU 3060Ti* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("3070", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  console.log(`gpuSelected`, gpuSelected);
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RTX3070* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("3080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RTX3080* \nNow please send the cost in USD of  ⤵", opts);
});
bot.action("3090", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RTX3090* \nNow please send the cost in USD of  ⤵", opts);
});

bot.on("message", (ctx) => {
  let userResponse = ctx.message.text;

  if (gpuSelected === "570") {
    gpuHashpower = 31000000;
    gpuMHS = "31mhs";
    gpuWatts = "85w";
  } else if (gpuSelected === "580") {
    gpuHashpower = 34000000;
    gpuMHS = "34mhs";
    gpuWatts = "135w";
  } else if (gpuSelected === "5500") {
    gpuHashpower = 26000000;
    gpuMHS = "26mhs";
    gpuWatts = "80w";
  } else if (gpuSelected === "5600") {
    gpuHashpower = 40000000;
    gpuMHS = "40mhs";
    gpuWatts = "110w";
  } else if (gpuSelected === "5700") {
    gpuHashpower = 55000000;
    gpuMHS = "55mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "6700XT") {
    gpuHashpower = 48000000;
    gpuMHS = "48mhs";
    gpuWatts = "140w";
  } else if (gpuSelected === "6800XT") {
    gpuHashpower = 54000000;
    gpuMHS = "54mhs";
    gpuWatts = "150w";
  } else if (gpuSelected === "1080") {
    gpuHashpower = 34000000;
    gpuMHS = "34mhs";
    gpuWatts = "170w";
  } else if (gpuSelected === "1080Ti") {
    gpuHashpower = 39000000;
    gpuMHS = "39mhs";
    gpuWatts = "180w";
  } else if (gpuSelected === "1660s") {
    gpuHashpower = 31000000;
    gpuMHS = "31mhs";
    gpuWatts = "75w";
  } else if (gpuSelected === "2060") {
    gpuHashpower = 30000000;
    gpuMHS = "30mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "2070") {
    gpuHashpower = 40000000;
    gpuMHS = "40mhs";
    gpuWatts = "140w";
  } else if (gpuSelected === "2080") {
    gpuHashpower = 41000000;
    gpuMHS = "41mhs";
    gpuWatts = "160w";
  } else if (gpuSelected === "2080Ti") {
    gpuHashpower = 55000000;
    gpuMHS = "55mhs";
    gpuWatts = "180w";
  } else if (gpuSelected === "3060") {
    gpuHashpower = 37000000;
    gpuMHS = "37mhs";
    gpuWatts = "110w";
  } else if (gpuSelected === "3060Ti") {
    gpuHashpower = 58000000;
    gpuMHS = "58mhs";
    gpuWatts = "130w";
  } else if (gpuSelected === "3070") {
    gpuHashpower = 59000000;
    gpuMHS = "59mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "3080") {
    gpuHashpower = 96000000;
    gpuMHS = "96mhs";
    gpuWatts = "145w";
  } else if (gpuSelected === "3090") {
    gpuHashpower = 114000000;
    gpuMHS = "114mhs";
    gpuWatts = "320w";
  }

  if (!isNaN(userResponse)) {
    calculateRevenue({ hashpower: gpuHashpower });
    let monthlyRevenueInUsd =
      parseFloat(revenueResult) * parseFloat(ethCurrentRate);
    let monthlyRevenueInUsdConverted =
      convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
    let gpuRoi =
      Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
    let fixedRoi = gpuRoi.toFixed(2);

    ctx.reply(
      `*Result for 1 ${gpuSelected}:*
  \n\nMHS: ${gpuMHS}
  \nWatts: ${gpuWatts}
  \nCost: $${ctx.message.text}
  \n*Months for breakeven: ${fixedRoi}*`,
      opts
    );
  } else {
    ctx.reply(
      `⚠️ The response must be a number without symbols and letters. Only a number, i.e.: *2000*`,
      opts
    );
  }
});

bot.launch();
