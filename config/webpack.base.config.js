const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// ------css tree shaking------
// const PurifyCss = require('purifycss-webpack');
// const glob = require('glob-all');
// ------css tree shaking------
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');

// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ROOTPATH = path.resolve(__dirname);
const isProd = process.env.NODE_ENV === 'production';
console.log('song-tianen-宋', process.env.NODE_ENV);
/*
  webpack配置文件里获取process.envNODE_ENV的值 由 cross-env 传入定义的
  开发文件中获取全局变量由webpack.DefinePlugin() 定义
 */
console.log('webpack环境打印process.env.NODE_ENV:', process.env.NODE_ENV);

const baseWebpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app: path.join(ROOTPATH, '../src/index'),
  },
  output: {
    path: path.join(ROOTPATH, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', 'jsx', '.json'],
  },

  // mode为production自动启用
  optimization: {
    usedExports: true,
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          comments: false,
          ecma: 6,
          cache: true,
          parallel: true,
          compress: {
            drop_console: true, // console
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ],
    runtimeChunk: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      // all (同步与异步都会做代码分割,配合cacheGroups.vendor使用)
      chunks: 'all',
      // 其他的参数默认即可
      // 同步的代码走：cacheGroups
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // 异步引入的 单独打一个vendor.js
          chunks: 'async',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true,
        },
        default: false,
      },
    },
  },
  plugins: [
    new AntdDayjsWebpackPlugin(),
    // 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
      },
      filename: 'index.html',
      template: path.join(ROOTPATH, '../src/index.html'),
    }),

    // 优化打包速度
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, '../dll/vendors.dll.js'),
    // }),
    // 优化打包速度
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dll/vendors.manifest.json'),
    // }),
    new webpack.DefinePlugin({
      WEBPACK_ENV: isProd
        ? JSON.stringify('production')
        : JSON.stringify('development'),
    }),
    // -----css-tree-shaking-----
    // new PurifyCSS({
    //   paths: glob.sync([
    //     // 要做CSS Tree Shaking的路径文件
    //     path.join(__dirname, '../src/*.html'),
    //     path.join(__dirname, '../src/*.js'),
    //   ]),
    // }),
    // -----css-tree-shaking-----
  ],
};

module.exports = baseWebpackConfig;
