'use strict';
// 说明：检测本地安装的和package.json版本对比(本地不能比package.json版本低)
const chalk = require('chalk');
// const semver = require('semver');

module.exports = class checkVersion {
  constructor(npmList = []) {
    // 接收用户需要校验的包
    this.packageList = npmList;
  }

  init() {
    // 过滤出需要校验的包信息，只检测线上包
    this.packageConfig = require('../package.json');
    this.needVerifyList = {};
    if (this.packageList && this.packageList.length > 0) {
      // 指定需要检查某一个包
      for (let name in this.packageConfig.dependencies) {
        if (this.packageList.indexOf(name) !== -1) {
          this.needVerifyList[name] = this.packageConfig.dependencies[name];
        }
      }
    } else {
      // 全部检查
      for (let name in this.packageConfig.dependencies) {
        // dc开头视为内部组件
        if (name.substring(0, 2) === 'dc') {
          this.needVerifyList[name] = this.packageConfig.dependencies[name];
        }
      }
    }
    console.log(chalk.yellow('正在检测本地安装包和描述文件指定版本是否相同...'));
    // 组装数据
    this.versionRequirements = [
      {
        name: 'node',
        devDependenciesVersion: [],
        dependenciesVersion: (list => {
          let versionList = [];
          for (let name in list) {
            versionList.push({
              name: name,
              cVersion: this.exec('npm view ' + name + ' version'), // 线上版本
              pVersion: list[name], // package.json版本
              nVersion: this.exec('npm ls ' + name + ' version --json') // 本地安装版本
            });
          }
          return versionList;
        })(this.needVerifyList || {})
      }
    ];

    this.verify();
  }

  exec(cmd) {
    // cmd命令读取包信息
    try {
      return require('child_process')
        .execSync(cmd)
        .toString()
        .trim();
    } catch (error) {
      return {
        type: 'error',
        // msg: '检测到本地安装版本(package-lock.json)和package.json指定版本不一致！'
        msg: error.message
      };
    }
  }

  verify(_npmList) {
    // 检测包是否存在问题
    let warnings = [];

    for (let i = 0; i < this.versionRequirements.length; i++) {
      const mod = this.versionRequirements[i];

      let dependenciesVersionWarnings = [];
      let dependenciesVersionError = [];

      for (var k = 0; k < mod.dependenciesVersion.length; k++) {
        const l = mod.dependenciesVersion[k];
        if (l.nVersion.type == 'error') {
          // 本地安装版本(package-lock.json)和package.json指定版本不一致（本地安装和包描述文件不一致问题）
          l.nVersion = l.nVersion.msg;
          dependenciesVersionError.push(l.name + '：' + chalk.red(l.nVersion) + ' package.json版本：' + chalk.yellow(l.pVersion));
        }
        // 无需检测，上面逻辑已覆盖
        // if (!semver.satisfies(l.cVersion, l.pVersion)) {
        //   // package.json指定版本和线上不一致（包不是最新版本问题）
        //   dependenciesVersionWarnings.push(l.name + '：线上版本：' + chalk.green(l.cVersion) + ' package.json版本：' + chalk.red(l.pVersion));
        // }
      }
      warnings = warnings.concat(dependenciesVersionWarnings, dependenciesVersionError);
    }

    // 输出问题
    if (warnings.length > 0) {
      console.log('');
      console.log(chalk.yellow('检测到以下包的本地版本和描述文件指定版本不相同：'));
      console.log();

      for (let i = 0; i < warnings.length; i++) {
        const warning = warnings[i];
        console.log('  ' + warning);
      }

      console.log();
      process.exit(1);
    }
  }
};
