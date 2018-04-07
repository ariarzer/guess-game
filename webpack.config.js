const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './public/js/build.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },
};
