module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-standard', './node_modules/prettier-stylelint/config.js'],
  rules: {
    // 定义一些适合团队约定的规则（null、表示禁用该规则, true、开启）
    // 不允许空的来源
    'no-empty-source': null,
    // 指定大写或小写十六进制的颜色
    'color-hex-case': null,
    // 需要或不允许at-rules前空一行
    'rule-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': true,
    // 不允许at-rules不明
    'at-rule-no-unknown': null
  }
};
