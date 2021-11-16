const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
require('dotenv').config({ path: './.env' });

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'titlebot/'),
  entry: {
    index: [path.join(__dirname, 'src/index.js')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|server.js|__tests__)/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [ 
          {
            loader: "style-loader",
          },
          { 
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
      title: 'Titlebot',
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env);
    }),
  ],
  
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build/'),
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/'),
      publicPath: '/'
    },
    client: {
      logging: 'verbose',
      overlay: true
    },
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      target: "https://localhost:3000",
      changeOrigin: true
    }
  }
};