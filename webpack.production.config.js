var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

  entry: './src/app/entry.js',

  output: {
    path: __dirname + '/build',
    filename: '[name]-[hash].js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    // strips out the development build things in libs like React
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/app/index.tmpl.html"
    }),
    // interesting issue preventing upgrade to 0.3.0 at the moment
    // https://github.com/webpack/compression-webpack-plugin/issues/16
    new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
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
    inline: true,
    hot: true
  }
};
