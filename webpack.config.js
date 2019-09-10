const path = require(`path`);
const MomentLocalesWebpackPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: true,
    port: 8080
  },
  plugins: [
    new MomentLocalesWebpackPlugin({
      localesToKeep: [`es-us`]
    })
  ]
};
