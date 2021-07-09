const I18n = require("./lib/i18n");
const path = require("path");

console.log(path.resolve(__dirname, "locale"));

export const i18n = new I18n({
  directory: path.resolve(__dirname, "locale"),
  defaultLanguage: "en",
  sessionName: "session",
  useSession: true,
  templateDate: {
    pluralize: I18n.pluralize,
    uppercase: (value) => value.toUpperCase(),
  },
});
