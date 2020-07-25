const path = require("path");

module.exports = {
  mode: "development",
  entry: "./spa-historyState/index.js",
  output: {
    path: path.resolve(__dirname, "spa-historyState"),
    filename: "bundle.js",
  },
  watch: true,
};
