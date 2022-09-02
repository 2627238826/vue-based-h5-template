/*
检查npm安装的依赖包的版本号与 package.json 中的版本号是否一致。
多人协作时，不同的人安装的依赖包的版本与package.json的依赖版本不同，有时会引起bug，所以做依赖包的检测。

逻辑：
读取package.json依赖包的版本号，再检查本地安装的依赖包的版本号，如果有差异，就报错。
*/
const packageJson = require('../package.json');

function checkVersion(dependencies) {
  if (!dependencies) return [];

  const errorMsgList = [];
  for (const name in dependencies) {
    const originalVersion = dependencies[name];
    const version = originalVersion.replace(/^\D*/, ''); //  保留数字及以后的版本号
    let packageJson;
    try {
      packageJson = require(name + '/package.json');
    } catch (error) {
      let msg = `${name} 依赖的版本、安装的版本分别为: ${version} , 未安装`;
      msg = msg + `，修复建议: npm install ${name}@${version}`;

      // nodejs v14.x，有些npm包报错: error.code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
      // Package subpath './package.json' is not defined by "exports"
      if (error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
        try {
          packageJson = getPackageJson(name);
        } catch (error2) {
          errorMsgList.push(msg);
          continue;
        }
      } else {
        errorMsgList.push(msg);
        continue;
      }
    }

    const installedVersion = packageJson.version;

    if (version !== installedVersion) {
      let msg = `${name} 依赖的版本、安装的版本分别为: ${version} , ${installedVersion}`;
      msg = msg + `，请使用相同版本，修复建议: npm install ${name}@${version}`;
      errorMsgList.push(msg);
    }
  }
  return errorMsgList;
}

function getKeysLength(object) {
  return Object.keys(object || {}).length;
}

function getPackageJson(name) {
  const path = require('path');
  const path2 = path.resolve(__dirname, '../node_modules/' + name + '/package.json');
  const fs = require('fs');
  let json = fs.readFileSync(path2, 'utf8');
  return JSON.parse(json);
}

const count = getKeysLength(packageJson.dependencies) + getKeysLength(packageJson.devDependencies);
console.log(`正在检查npm依赖包的版本...(共计${count}个包)`, new Date().toLocaleString());

const msgList = checkVersion(packageJson.dependencies);
const msgList2 = checkVersion(packageJson.devDependencies);
const errorMsgList = msgList.concat(msgList2);

const now = new Date().toLocaleString();
if (!errorMsgList.length) {
  console.log('检查通过！', now);
} else {
  console.log('为保证多人开发时开发环境一致，请保证 package.json 依赖的版本号与安装的版本号保持相同', now);
  console.log('详细错误信息:');
  console.error(errorMsgList.join('\n'));
  process.exit(1);
}
