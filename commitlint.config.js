/**
 * 配置commit规则
  Commit message格式 <type>: <subject>，注意冒号后面有空格
  1、<type>用于说明 commit 的类别，只允许使用下面7个标识
  2、<subject>是 commit 目的的简短描述，不超过50个字符，且结尾不加句号（.）
  *********************************************************************

  规则例子：
  build: 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
  ci: 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
  docs: 文档更新
  feat: 新增功能
  update: 修改了代码
  fix: bug 修复
  perf: 性能, 体验优化
  refactor: 重构代码(既没有新增功能，也没有修复 bug)
  style: 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
  test: 新增测试用例或是更新现有测试
  revert: 回滚某个更早之前的提交
  merge: 分支合并 Merge branch ? of ?
  chore: 不属于以上类型的其他类型
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'ci', 'docs', 'feat', 'update', 'fix', 'perf', 'refactor', 'style', 'test', 'revert', 'merge', 'chore']]
  }
};
