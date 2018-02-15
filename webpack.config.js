const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/browser.js',
  output: {
  filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }, 
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [new HtmlWebpackPlugin()]
};
