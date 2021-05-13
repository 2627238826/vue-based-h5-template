/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/* 是否为空值 */
export function isValueNull(value) {
  if (!value) {
    return false;
  }
  return true;
}

/**
 * [validPhone 合法手机号]
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export function validPhone(value) {
  // const reg = /^[1]\d{10}$/
  const reg = /^1[0-9]{10}$/;
  return reg.test(value);
}

/* 非0正整数 */
export function validateInteger(value) {
  const reg = /^[1-9]\d*$/;
  return reg.test(value);
}

/**
 * [isContainString 6-16位字符（字母、数字、特殊符号），区分大小写]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
export function isValidString(str) {
  const reg = /^([\w~!@#$%^&*()+`\-=[\]\\{}|;':",./<>?]{6,16})$/;
  return reg.test(str);
}

/**
 * [isIncludeFullChar 是否包含全角字符]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
export function isIncludeFullChar(str) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code > 65248 || code === 12288) {
      return true;
    }
  }
  return false;
}

/**
 * [isIncludeChinese 是否包含中文]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
export function isIncludeChinese(str) {
  const reg = /[\u4e00-\u9fa5]/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 合法URL
 * @param  {[type]} url [description]
 * @return {[type]}         [description]
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 大小写字母
 * @param {*} str
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
