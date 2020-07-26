const path = require("path");

module.exports = {
  mode: "development",
  entry: "./spa-checkExample/index.js",
  output: {
    path: path.resolve(__dirname, "spa-checkExample"),
    filename: "bundle.js",
  },
  watch: true,
};
