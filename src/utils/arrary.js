/* ----------------------------------------------------
						Array
 ---------------------------------------------------- */
/* 去重 */
export function unique(arr) {
  return Array.from(new Set(arr));
}

/**
 * 根据数组对象属性排序
 */
export function sortByProps(data, props, isReverse = false) {
  return data.sort(function(props) {
    if (isReverse) {
      return (a, b) => b[props] - a[props];
    } else {
      return (a, b) => a[props] - b[props];
    }
  });
}
