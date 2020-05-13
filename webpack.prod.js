const path = require('path')

var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    login: './src/page-login/main.js',
    staff: './src/page-staff/main.js',
    leader: './src/page-leader/main.js',
    register: './src/page-register/main.js',
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CleanWebpackPlugin(), // cleans output.path by default
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/commons",
        to: "commons"
      }
    ]),
    new HtmlWebpackPlugin({
      template: './src/page-login/tmpl.html',
      inject: true,
      chunks: ['login'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-register/tmpl.html',
      inject: true,
      chunks: ['register'],
      filename: 'register.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-staff/tmpl.html',
      inject: true,
      chunks: ['staff'],
      filename: 'staff.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-leader/tmpl.html',
      inject: true,
      chunks: ['leader'],
      filename: 'leader.html'
    }),
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
