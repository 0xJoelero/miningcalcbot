import i18n from "i18next";

i18n.init({
  resources: {
    en: {
      translations: {
        "reply.welcome":
          `Hi {{user}}! I'm @miningcalcbot.\nI'm a bot that calculates *ROI of GPU investments for Ethereum mining.*` +
          `\n\n⚠️  This bot is in ALPHA, use it at your own risk. ⚠️ ` +
          `\n\n*Commands:* \n/help -> Get help about the bot and commands,\n/calculateRoi -> Return list of GPUs to calculate ROI.` +
          `\n\n\n*Author*: @Joelero \n*Github*: https://github.com/joelperedaok/miningcalcbot `,
        "reply.help":
          `/help -> list all commands` +
          `\n/calculateRoi -> Calculate ROI for supported GPUs`,
        "calculateRoi.select_gpu": `*Select a GPU to calculate the break even:*`,
        "calculateRoi.selected_gpu": `*{{gpu_model}}* \nPlease tell me the cost in USD:`,
        "calculateRoi.result":
          `*Result for 1 {{gpu_selected}}:*` +
          `\n\nMH/s: {{gpu_hashrate}}` +
          `\nWatts: {{gpu_watts}}` +
          `\nCost: {{gpu_cost}}` +
          `\nROI: {{gpu_roi}}`,
        "calculateRoi.error": `⚠️ The response must be a valid supported GPU, please select it from te buttons above. ⚠️`,
      },
    },
  },
  fallbackLng: "en",
  debug: true,
  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
