const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    login: './src/page-login/main.js',
    staff: './src/page-staff/main.js',
    leader: './src/page-leader/main.js',
    register: './src/page-register/main.js',
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
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
        test: /\.css$/i,
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
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
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
    new HtmlWebpackPlugin({
      template: './src/page-leader/ta/tmpl.html',
      inject: true,
      filename: 'ta'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-leader/vacation/tmpl.html',
      inject: true,
      filename: 'vacation'
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/page-contacts/tmpl.html',
    //   inject: true,
    //   chunks: ['contacts'],
    //   filename: 'contacts.html'
    // })
  ]
}
