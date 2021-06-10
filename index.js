const { Telegraf } = require("telegraf");
const { getReward, getEthPrice } = require("./apis");
const { TELEGRAM_TOKEN } = require("./environment");

const bot = new Telegraf(TELEGRAM_TOKEN);

let ethCurrentRate;
let currentReward;
let revenueResult;

// Inline buttons to select the GPUs
let buttons = [
  [
    {
      text: "RX 580",
      callback_data: "580",
    },
    {
      text: "RX 5700XT",
      callback_data: "5700",
    },
  ],
  [
    {
      text: "RTX 3070",
      callback_data: "3070",
    },
    {
      text: "RTX 3080",
      callback_data: "3080",
    },
  ],
  [
    {
      text: "GTX 1660 Super",
      callback_data: "1660",
    },
    {
      text: "RX 5500",
      callback_data: "5500",
    },
  ],
];

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
    \n\n*Commands:*
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
      inline_keyboard: buttons,
    },
    parse_mode: "Markdown",
  });
});

// If user select 5700
bot.action("5700", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX5700XT* \nNow please send the cost in USD ⤵", opts);
  // When the user insert and send the cost
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      // if is numeric
      calculateRevenue({ hashpower: 55000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(userResponse) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 RX5700XT:*
      \n\nMHS: 55
      \nWatts: 115w
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
});
bot.action("580", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX580* \nNow please send the cost in USD ⤵", opts);
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      calculateRevenue({ hashpower: 34000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 RX580:*
      \n\nMHS: 34
      \nWatts: 130w
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
});
bot.action("3070", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RTX3070* \nNow please send the cost in USD ⤵", opts);
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      calculateRevenue({ hashpower: 59000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 RTX3070:*
      \n\nMHS: 59
      \nWatts: 125w
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
});
bot.action("3080", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RTX3080* \nNow please send the cost in USD ⤵", opts);
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      calculateRevenue({ hashpower: 95000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 RTX3080:*
      \n\nMHS: 95
      \nWatts: 135w
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
});
bot.action("1660", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU GTX1660* \nNow please send the cost in USD ⤵", opts);
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      calculateRevenue({ hashpower: 30000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 GTX1660:*
      \n\nMHS: 30
      \nWatts: 80w
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
});
bot.action("5500", (ctx1) => {
  ethRate();
  rewardResult();
  ctx1.reply("*GPU RX5500XT* \nNow please send the cost in USD of  ⤵", opts);
  bot.on("message", (ctx) => {
    let userResponse = ctx.message.text;
    if (!isNaN(userResponse)) {
      calculateRevenue({ hashpower: 26000000 });
      let monthlyRevenueInUsd =
        parseFloat(revenueResult) * parseFloat(ethCurrentRate);
      let monthlyRevenueInUsdConverted =
        convertExponentialToDecimal(monthlyRevenueInUsd) * 30;
      let gpuRoi =
        Number(ctx.message.text) / parseFloat(monthlyRevenueInUsdConverted);
      let fixedRoi = gpuRoi.toFixed(2);

      ctx.reply(
        `*1 RX5500XT:*
      \n\nMHS: 26
      \nWatts: 85w
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
});

bot.launch();
