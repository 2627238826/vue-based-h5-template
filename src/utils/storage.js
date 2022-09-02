const PROJECT = process.env.PROJECT_DATA.PROJECT_NAME;

/* 缓存规则是使用'工程名-'组合
	localStorage
 */
export function setLocalStorage(key, value) {
  return localStorage.setItem(PROJECT + '-' + key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  let json = localStorage.getItem(PROJECT + '-' + key);
  if (!json || json === 'undefined') {
    return '';
  }
  return JSON.parse(json);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(PROJECT + '-' + key);
}

/*
	sessionStorage
 */
export function setSessionStorage(key, value) {
  return sessionStorage.setItem(PROJECT + '-' + key, JSON.stringify(value));
}

export function getSessionStorage(key) {
  let json = sessionStorage.getItem(PROJECT + '-' + key);
  if (!json || json === 'undefined') {
    return '';
  }
  return JSON.parse(json);
}

export function removeSessionStorage(key) {
  return sessionStorage.removeItem(PROJECT + '-' + key);
}

/*
	cookie
 */
export function setCookie(name, value, day) {
  const date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + '=' + value + ';expires=' + date;
}

export function getCookie(name) {
  const arr = document.cookie.split('; ');
  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=');
    if (arr2[0] === name) {
      return arr2[1];
    }
  }
  return '';
}

export function removeCookie(name) {
  setCookie(name, '1', -1);
}
