const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  entry: './content.js', // Entry point for your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@langchain/core': path.resolve(__dirname, 'node_modules/@langchain/core'),
      'langchain': path.resolve(__dirname, 'node_modules/langchain'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
};