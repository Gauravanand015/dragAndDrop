const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

// How to use webpack in typescript projects

// 1) First make a new file which is *[webpack.config.js]* name should be.
// 2) Remove all the extensions written in import of the function and classes for example -> .js, .ts etc
// 3) Now in *[webpack.config.js]* we need entry point by which webpack look into the file in this project the entry point is app.ts that why we have comment the *[rootDir]* in tsconfig.json.
// 4) Now in *[webpack.config.js]* we need the absolute path in output property. To build the absolute path we are using *[path]* module which is preinstalled in node.js.

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
