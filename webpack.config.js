const path = require('path');

var SRC_DIR = path.join(__dirname, './client/src');
var DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  mode: 'development',

  entry: {
    index: `${SRC_DIR}/index.jsx`,
    favorite: `${SRC_DIR}/favorite.jsx`
  },

  output: {
    filename: '[name]bundle.js',

    path: DIST_DIR
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
        {
          loader: 'url-loader',
        }
      ]
    }
    ]
  }
}