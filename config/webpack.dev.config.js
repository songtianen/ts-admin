const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const aliyunTheme = require('@ant-design/aliyun-theme').default;

const baseWebpackConfig = require('./webpack.base.config');

const webpackDevConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 5555,
    // 静态文件路径
    contentBase: path.resolve(__dirname, '../dist'),
    inline: true,
    overlay: {
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        // 根据后端是否提供 ‘/api’ 来确定
        // pathRewrite: { '^/api': '' },
      },
    },
    /*
     当你不配置devServer下的publicPath时，其会默认将包打到output.publicPath的路径下。
     当你配置了devServer下的publicPath时，才其会将包打开你指定的路径下
    此项publicPath不设置，默认找 output的 publicPath 路径
    如果output也不设置publicPath：（与之相同路径）仍旧找不到文件）
    */
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html',
    },
  },
  module: {
    rules: [
      {
        // loader编译之前，去验证
        enforce: 'pre',
        test: /\.(js|ts)$/,
        loader: 'eslint-loader',
        // 排除
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(tsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(less|css)$/,
        use: [
          // { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 15 versions'],
                }),
                // require('postcss-import')(),
                // require('stylelint')(),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: aliyunTheme,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        exclude: path.resolve(__dirname, '../node_modules'),

        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: path.resolve(__dirname, '../node_modules'),

        use: [
          {
            loader: 'url-loader',
            options: {
              // 通过options 配置路径
              name: '[name].[ext]',
              limit: 8192,
              outputPath: 'assets/imgs/',
            },
          },
          {
            loader: 'img-loader', // 图片压缩
            options: {
              pngquant: {
                quality: 80,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // 循环依赖预警
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
    }),

    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: '9999',
    }),

    // 包分析器
    //    new CompressionPlugin({ //gzip
    //   test: /\.js$|\.css$/,
    //   cache: true,
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   threshold: 0,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true
    // }),
    // --
  ],
});

module.exports = webpackDevConfig;
