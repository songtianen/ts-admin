const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendors: [
      'antd',
      'axios',
      'create-react-class',
      'crypto-js',
      'echarts',
      'echarts-for-react',
      'history',
      'prop-types',
      'qs',
      'react',
      'react-content-loader',
      'react-dom',
      'react-loadable',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-saga',
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]',
  },
  plugins: [
    // 分析
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
};
