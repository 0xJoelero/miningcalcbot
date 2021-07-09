const { Telegraf, Markup } = require("telegraf");
const { getReward, getEthPrice } = require("./apis");
const { selectGpuButtons, selectLanguageButtons } = require("./buttons");
const { TELEGRAM_TOKEN } = require("./environment");
const LocalSession = require("telegraf-session-local");
const { i18n } = require("./translations");
const { supported_gpus, supported_gpus_data } = require("./supported_gpus");

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.use(i18n.middleware());

const property = "data";

const localSession = new LocalSession({
  database: "example_db.json",
  property: "session",
  storage: LocalSession.storageFileAsync,
  format: {
    serialize: (obj) => JSON.stringify(obj, null, 2),
    deserialize: (str) => JSON.parse(str),
  },
  state: { messages: [] },
});

localSession.DB.then((DB) => {
  console.log("Current LocalSession DB:", DB.value());
});

bot.use(localSession.middleware(property));

const langKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("English 🇬🇧", "en"),
  Markup.button.callback("Español 🇪🇸", "es"),
]);

let ethCurrentRate;
let currentReward;
let revenueResult;
let gpuSelected;
let gpuHashpower;
let gpuMHS;
let gpuWatts;

// Options to set forceReply in messages
const opts = {
  reply_markup: { inline_keyboard: selectGpuButtons },
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
    i18n.t(ctx[property].language, "reply_welcome", {
      user: ctx.chat.first_name,
    })
  );
});

bot.command("help", (ctx) => {
  ctx.reply(i18n.t(ctx[property].language, "reply_help"), opts);
});

// Declare /calculateRoi command, return the inline buttons

bot.command("calculateRoi", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    i18n.t(ctx[property].language, "calculateRoi_selectGpu"),
    {
      reply_markup: {
        inline_keyboard: selectGpuButtons,
      },
      parse_mode: "Markdown",
    }
  );
});

bot.command("language", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    i18n.t(ctx[property].language, "language_options"),
    {
      reply_markup: {
        inline_keyboard: selectLanguageButtons,
      },
      parse_mode: "Markdown",
    }
  );
});

bot.action("en", (ctx) => {
  ctx[property].language = "en";
  ctx.reply("Language changed!");
});

bot.action("es", (ctx) => {
  ctx[property].language = "es";
  ctx.reply("Cambiaste el idioma");
});
/*
bot.action("RX 570 8GB", (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t(
      ctx1[property].language,
      'calculateRoi_selectedGpu',
      {gpu_model:gpuSelected}
    ) 
  );
});
*/
bot.action(supported_gpus, (ctx1) => {
  gpuSelected = ctx1.callbackQuery.data;
  ethRate();
  rewardResult();
  ctx1.reply(
    i18n.t(ctx1[property].language, "calculateRoi_selectedGpu", {
      gpu_model: gpuSelected,
    })
  );
});

bot.on("message", (ctx) => {
  let userResponse = ctx.message.text;

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
      i18n.t(ctx[property].language, "calculateRoi_result", {
        gpu_model: gpuSelected,
        gpu_hashrate: gpuMHS,
        gpu_watts: gpuWatts,
        gpu_cost: ctx.message.text,
        gpu_roi: fixedRoi,
      })
    );
  } else {
    ctx.reply(i18n.t("calculateRoi_error"), opts);
  }
});

export const langSelected = lang;

bot.launch();
