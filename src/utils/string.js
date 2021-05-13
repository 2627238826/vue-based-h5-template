export function trim(str) {
  if (!str) return '';
  return str.replace(/^\s*|\s*$/g, '');
}

export function trimLeft(str) {
  if (!str) return '';
  return str.replace(/(^\s*)/g, '');
}

export function trimRight(str) {
  if (!str) return '';
  return str.replace(/(\s*$)/g, '');
}
