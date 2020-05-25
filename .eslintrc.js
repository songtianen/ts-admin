module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
    'airbnb-typescript',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'react-hooks',
    '@typescript-eslint',
    'react',
    'jsx-control-statements',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    'jsx-control-statements/jsx-control-statements': true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
    'no-param-reassign':[0],
    'no-plusplus':[0],
    'import/prefer-default-export':[0],
    'react/prop-types': [0],
    '@typescript-eslint/camelcase':[0],
    '@typescript-eslint/no-var-requires': [0],
    'react/jsx-props-no-spreading':[0],
    camelcase: [0],
    'global-require': [0],
    'import/no-extraneous-dependencies': [0],
    'no-unused-expressions': [0],
    'no-useless-escape': [0],
    semi: [0],
    'no-debugger': [0],
    'no-empty': [0],
    'comma-dangle': [0],
    'space-before-function-paren': [0],
    'import/no-cycle': [0],
    'max-len': [0],
  },
};
