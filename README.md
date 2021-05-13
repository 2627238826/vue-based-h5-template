# 一个基于Vue.js的移动端的CSR项目模板
[toc]

**注意: 开发环境node版本不可过高（建议8.\*.\*）**

## 快速起步

### 安装

先切回到公司内部npm源。
```
nrm use dachen
```

Windows系统安装
```
$ npm install dc-cli -g
```

Mac下安装
```
$ sudo npm install dc-cli -g
```

### 指令

```
# 查看帮助信息
$ dc

# 指定项目名字创建项目
$ dc create 模板名<template-name> 项目名字<project-name>

# 在当前目录创建项目（!!!注意模板名后面加.）
$ dc create 模板名<template-name> .

# 查看所有支持的项目模板
$ dc list
```

## 模板说明

### 目录结构
```
- build/  webpack打包配置
- config/ 开发调试配置
- dist/ 打包文件夹
- public/ 模板html
- src/  主要功能业务相关目录
  - assets/ 静态资源
  - components/ 全局组件
  - constants/ 全局常量定义
  - directives/ 全局自定义指令
  - filters/  全局过滤器
  - router/ 路由文件夹
  - services/ 全局http请求处理
  - store/ vuex状态管理文件夹
  - utils/ 工具函数
  - views/ 页面
  App.vue   vue入口
  main.js 入口js
- test/e2e  测试文件夹（暂未用到）
- .editorconfig   VS Code书写规范配置
- .eslintignore eslint语法校验忽略配置文件
- .eslintrc.js eslint语法校验配置文件
- .gitgnore 忽略版本管理配置
- .postcssrc.js PostCSS插件转换CSS配置
- .prettierrc.js  代码格式美化
- .stylelintignore 样式校验规则忽略文件
- .stylelintrc.js  样式校验配置文件
- commitlint.config.js  git提交说明校验
- package-lock.json 
- package.json 
- README.md 说明文档
```


### 相关主要配置说明

#### 基础配置
- **引入vant UI库**
- **字体图标库awesome [Font Awesome官网](https://fontawesome.dashgame.com/)**
- **测试环境会开启v-console调试，生产环境关闭**


图标库使用：
```
# 使用：
<icon name="beer"></icon>
```

#### 默认http配置

http接口请求200正确响应，返回响应数据格式：
成功：
```
{
  resultMsg,
  success,
  data
}
```

接口失败(展示后台错误提示)：
```
{
  resultMsg: resultMsg,
  success: false
}

```
**无论是http请求错误或后台接口错误时都会有错误提示；**
**http请求正确，后端报错，默认优先展示后台错误提示**


#### Vuex使用

```
// 设置vuex属性值:
this.$store.commit('SET_VALUE_BY_KEY', value)

// 删除vuex属性值
this.$store.commit('REMOVE_STATE_BY_KEY', value)
```
user.js中提供方法（根据实际情况调用）
- **在公司内部app中通过桥获取用户token**
- **根据token获取用户信息**
- **微信环境下根据code换取用户信息**

#### 路由使用
添加路由时，注意：
```
meta.needWxAuthorize 字段作为判断页面是否在微信要授权标识
```
- **内置在微信环境下并且需要授权时获取微信用户信息**

#### 工具函数列表
```
- utils/
  - array.js 
    unique: 去重
    sortByProps: 数组对象属性排序
  - dom.js
    hasClass: 判断节点上是否有class类
    addClass: 节点上添加指定class类
    removeClass: 节点上移除指定class类
    toggleClass: 添加/移除class类开关
    scrollTo: 多长时间内滚动到指定位置
  - format.js
    queryString:  请求参数转换为string
    dateFormat: 时间格式化函数
    toThousand： 转换为千分制
    currency 将金额格式化，例：123000.22 => $123,000.22
    bytes： 字节大小转化为'bytes', 'kB', 'MB', 'GB', 'TB'、'PB'
  - object.js
    getQueryObject: 获取URL参数
  - storage.js
    setLocalStorage: 设置工程的localStorage
    getLocalStorage: 获取工程的localStorage
    removeLocalStorage: 删除工程的localStorage
    setSessionStorage: 设置工程的setSessionStorage
    getSessionStorage: 获取工程的getSessionStorage
    removeSessionStorage: 删除工程的removeSessionStorage
    setCookie: 设置工程的Cookie
    getCookie: 获取工程的Cookie
    removeCookie: 删除工程的Cookie
  - string.js
    trim:去除字符串首尾空格
    trimLeft: 去除字符串首部空格
    trimRight: 去除字符串尾部空格
  - validate.js
    isExternal: url是否有为标记协议（https、mailto、tel）
    isValueNull: 是否为空值
    validPhone: 合法手机号
    validateInteger: 非0正整数
    isValidString: 校验是否为6-16位字符，区分大小写可包含字母、数字、特殊符号
    isIncludeFullChar: 是否包含全角字符
    isIncludeChinese: 是否包含中文
    validEmail: 校验是否为邮箱
    validURL: 校验是否合法URL
    validLowerCase: 校验是否为小写字母
    validUpperCase: 校验是否为大写字母
    validAlphabets: 校验是否为大小写字母 
  - index.js
    (包含上面函数)
    debounce: 防抖
    throttle: 节流
    countDown: 倒计时
    isDevMode: 是否是开发模式
    getParmas: 获取url参数
    getDevice: 判断设备(微信/qq/微博、Android、iOS )
    getplatform： 判断平台（mobile：移动端、pc：电脑端）
    browserType： 判断当前浏览类型
    ajax: ajax请求

```



