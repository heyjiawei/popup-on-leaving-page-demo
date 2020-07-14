const path = require("path");

module.exports = {
  mode: "development",
  entry: "./spa-sessionStorage/index.js",
  output: {
    path: path.resolve(__dirname, "spa-sessionStorage"),
    filename: "bundle.js",
  },
  watch: true,
};
