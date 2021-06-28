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
          `\nMonthly profit: {{gpu_monthly_revenue}}` +
          `\nROI: {{gpu_roi}}`,
        "calculateRoi.error": `⚠️ The response must be a valid supported GPU, please select it from te buttons above. ⚠️`,
      },
    },
    es: {
      translations: {
        "reply.welcome":
          `Hola {{user}}! Soy @miningcalcbot.\nSoy un bot que calcula el *ROI de inversiones en GPUs para mineria de Ethereum.*"` +
          `\n\n⚠️ Este bot esta en ALPHA, uselo bajo su propio riesgo ⚠️ ` +
          `\n\n*Commandos:* \n/help -> Obtiene informacion sobre el bot y los comandos,\n/calculateRoi -> Muestra una lista de GPUs con la que puedes calcular el ROI.` +
          `\n\n\n*Autor*: @Joelero \n*Github*: https://github.com/joelperedaok/miningcalcbot `,
        "reply.help":
          `/help -> Lista los comandos` +
          `\n/calculateRoi -> Calcula el ROI para las GPUs que el bot soporta`,
        "calculateRoi.select_gpu": `*Selecciona una GPU para calcular el punto de equilibrio:*`,
        "calculateRoi.selected_gpu": `*{{gpu_model}}* \nPor favor dime el costo en USD:`,
        "calculateRoi.result":
          `*Resultado para 1 {{gpu_selected}}:*` +
          `\n\nMH/s: {{gpu_hashrate}}` +
          `\nWatts: {{gpu_watts}}` +
          `\nCosto: {{gpu_cost}}` +
          `\nGanancia mensual: {{gpu_monthly_revenue}}` +
          `\nROI: {{gpu_roi}}`,
        "calculateRoi.error": `⚠️ La respuesta debe ser una GPU válida, selecciónela de los botones de arriba. ⚠️`,
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
