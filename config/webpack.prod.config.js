const path = require('path');
const merge = require('webpack-merge');

// const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const aliyunTheme = require('@ant-design/aliyun-theme').default;
const baseWebpackConfig = require('./webpack.base.config');

const webpackProdConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/public/', // 静态资源部署CDN
    // publicPath: 'http://localhost:8888/public/', // 本地调试用(npm run build-server)
  },
  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      // {
      //   // loader编译之前，去验证
      //   enforce: 'pre',
      //   test: /.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   // 排除
      //   exclude: path.resolve(__dirname, '../node_modules'),
      // },
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
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
    new BundleAnalyzerPlugin(), // 包分析器
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new CleanWebpackPlugin(),

    //  前端压缩
    // new CompressionPlugin({
    //   filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
    //   algorithm: 'gzip', // 算法
    //   test: /\.(js|css)$/, // 压缩 js 与 css
    //   threshold: 10240, // 只处理比这个值大的资源。按字节计算
    //   minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
    //   deleteOriginalAssets: true,
    // }),
  ],
});

module.exports = webpackProdConfig;
