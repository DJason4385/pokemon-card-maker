var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    './src/app/entry.js'
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules!postcss'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin("Copyright Davemo Inc™"),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/app/index.tmpl.html"
    })
  ],

  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    })
  ],

  devServer: {
    contentBase: './public',
    colors: true,
    historyApiFallback: true,
    inline: true
  }
};
