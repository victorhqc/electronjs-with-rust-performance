const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    { loader: 'css-loader', options: { importLoaders: 1 } },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  ],
});

plugins.push(
  new MiniCssExtractPlugin({
    filename: 'styles.css',
    chunkFilename: 'styles.css',
  }),
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
};
