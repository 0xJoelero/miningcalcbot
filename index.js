const { Telegraf } = require("telegraf");
const { getReward, getEthPrice } = require("./apis");
const { selectGpuButtons } = require("./buttons");
const { TELEGRAM_TOKEN } = require("./environment");
const { trans } = require("./translations");
import i18n from "i18next";

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
  ctx.reply(i18n.t("reply.welcome", { user: ctx.chat.first_name }), opts);
});

bot.command("help", (ctx) => {
  ctx.reply(i18n.t("reply.help"), opts);
});

// Declare /calculateRoi command, return the inline buttons
bot.command("calculateRoi", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, i18n.t("calculateRoi.select_gpu"), {
    reply_markup: {
      inline_keyboard: selectGpuButtons,
    },
    parse_mode: "Markdown",
  });
});

bot.action("RX 570 8GB", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 580 8GB", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 5500 XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 5600 XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 5700 XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 6700 XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RX 6800 XT", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("GTX 1080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("GTX 1080 Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("GTX 1660 Super", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 2060", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 2070", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 2080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 2080 Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 3060", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 3060 Ti", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 3070", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 3080", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});
bot.action("RTX 3090", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t("calculateRoi.selected_gpu", { gpu_model: ctx1.callbackQuery.data }),
    opts
  );
});

bot.on("message", (ctx) => {
  let userResponse = ctx.message.text;

  if (gpuSelected === "RX 570 8GB") {
    gpuHashpower = 31000000;
    gpuMHS = "31mhs";
    gpuWatts = "85w";
  } else if (gpuSelected === "RX 580 8GB") {
    gpuHashpower = 34000000;
    gpuMHS = "34mhs";
    gpuWatts = "135w";
  } else if (gpuSelected === "RX 5500 XT") {
    gpuHashpower = 26000000;
    gpuMHS = "26mhs";
    gpuWatts = "80w";
  } else if (gpuSelected === "RX 5600 XT") {
    gpuHashpower = 40000000;
    gpuMHS = "40mhs";
    gpuWatts = "110w";
  } else if (gpuSelected === "RX 5700 XT") {
    gpuHashpower = 55000000;
    gpuMHS = "55mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "RX 6700 XT") {
    gpuHashpower = 48000000;
    gpuMHS = "48mhs";
    gpuWatts = "140w";
  } else if (gpuSelected === "RX 6800 XT") {
    gpuHashpower = 54000000;
    gpuMHS = "54mhs";
    gpuWatts = "150w";
  } else if (gpuSelected === "GTX 1080") {
    gpuHashpower = 34000000;
    gpuMHS = "34mhs";
    gpuWatts = "170w";
  } else if (gpuSelected === "GTX 1080 Ti") {
    gpuHashpower = 39000000;
    gpuMHS = "39mhs";
    gpuWatts = "180w";
  } else if (gpuSelected === "GTX 1660 Super") {
    gpuHashpower = 31000000;
    gpuMHS = "31mhs";
    gpuWatts = "75w";
  } else if (gpuSelected === "RTX 2060") {
    gpuHashpower = 30000000;
    gpuMHS = "30mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "RTX 2070") {
    gpuHashpower = 40000000;
    gpuMHS = "40mhs";
    gpuWatts = "140w";
  } else if (gpuSelected === "RTX 2080") {
    gpuHashpower = 41000000;
    gpuMHS = "41mhs";
    gpuWatts = "160w";
  } else if (gpuSelected === "RTX 2080 Ti") {
    gpuHashpower = 55000000;
    gpuMHS = "55mhs";
    gpuWatts = "180w";
  } else if (gpuSelected === "RTX 3060") {
    gpuHashpower = 37000000;
    gpuMHS = "37mhs";
    gpuWatts = "110w";
  } else if (gpuSelected === "RTX 3060 Ti") {
    gpuHashpower = 58000000;
    gpuMHS = "58mhs";
    gpuWatts = "130w";
  } else if (gpuSelected === "RTX 3070") {
    gpuHashpower = 59000000;
    gpuMHS = "59mhs";
    gpuWatts = "120w";
  } else if (gpuSelected === "RTX 3080") {
    gpuHashpower = 96000000;
    gpuMHS = "96mhs";
    gpuWatts = "145w";
  } else if (gpuSelected === "RTX 3090") {
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
      i18n.t("calculateRoi.result", {
        gpu_selected: gpuSelected,
        gpu_hashrate: gpuMHS,
        gpu_watts: gpuWatts,
        gpu_cost: ctx.message.text,
        gpu_roi: fixedRoi,
      }),
      opts
    );
  } else {
    ctx.reply(i18n.t("calculateRoi.error"), opts);
  }
});

bot.launch();
