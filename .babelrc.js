module.exports = function (api) {
  const isProd = api.env();
  // console.log('这是babel的api.env', isProd)
  const presets = [
    [
      '@babel/preset-env',
      {
        // 'modules': false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
    '@babel/preset-react',
    "@babel/preset-typescript"
  ];
  const plugins = [
    // 解析动态import
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
    'react-hot-loader/babel',
    // 用来编译类
    '@babel/plugin-proposal-class-properties',
  ];
  return {
    presets,
    plugins,
  };
};
