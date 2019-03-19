const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const baseConfig = require('./webpack.base.config');

const prodConfig = env => merge([
  {
    devtool: 'source-map',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
        }),
      ],
    },
    plugins: [
      new Visualizer({ filename: './stats.html' }),
    ],
  },
]);


module.exports = env => merge(baseConfig(env), prodConfig(env));
