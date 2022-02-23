const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "[contenthash].bundle.js",
    chunkFilename: "[contenthash].bundle.js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".jsx", ".js", ".ts", ".tsx"],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    proxy: { "/api": "http://localhost:5000" },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css.[contenthash:8].css",
      chunkFilename: "[contenthash:8].chunk.css",
    }),
  ].filter(Boolean),
};
