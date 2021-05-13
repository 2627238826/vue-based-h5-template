/**
 * 哪些地方需要使用vw适配
 * 1. 容器适配，可以使用vw
 * 2. 文本的适配，可以使用vw
 * 3. 大于1px的边框、圆角、阴影都可以使用vw
 * 4. 内距和外距，可以使用vw
 */
module.exports = {
  plugins: {
    'postcss-import': {}, // 解决@import引入问题
    'postcss-url': {}, // 处理文件路径的引用
    autoprefixer: {},
    // 转换现代CSS为浏览器支持的pkg
    'postcss-preset-env': {},
    'postcss-aspect-ratio-mini': {}, // 处理元素容器宽高比
    // 处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理
    'postcss-write-svg': {
      utf8: false
    },
    // 转换px-vw/vh等
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度(基于你的视觉稿来定)
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数, 很多时候无法整处
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      /**
       * 如果不需要把px转换为vw, 只需要在html对应元素添加指定类名如
       * <div class="box ignore"></div>
       * .hairlines一般用于设置border-width:0.5px的元素
       */
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // (Number) 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // (Boolean) 允许在媒体查询中转换`px`
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    },
    'postcss-viewport-units': {
      filterRule: rule =>
        rule.selector.includes('::after') &&
        rule.selector.includes('::before') &&
        rule.selector.includes(':after') &&
        rule.selector.includes(':before')
    },
    // 压缩清理CSS
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false // 避免重复使用
      }
    }
  }
};
