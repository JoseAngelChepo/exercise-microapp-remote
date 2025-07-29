const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path')

module.exports = {
  entry: './src/main.jsx',
  mode: 'development',
  devServer: {
    port: 3001,
    static: './dist',
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsApp': './src/App',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.1.1' },
        'react-dom': { singleton: true, requiredVersion: '^19.1.1' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};