module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['standard', 'plugin:vue/essential', '@vue/prettier'],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint'
  },
  plugins: ['prettier'],
  rules: {
    // 定义一些适合团队约定的规则（0、关闭规则, 2、打开规则）
    // 禁止没有任何内容的return;
    'no-useless-return': 0,
    // 禁用 debugger
    'no-debugger': 0,
    // 禁用 console
    'no-console': 0,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-control-regex': 0,
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': [2, 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!'] }]
  }
};
