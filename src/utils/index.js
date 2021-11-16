/**
 * 判断所有数据类型
 * @param {*} target
 */
export const getType = (target) => {
  const type = typeof target;
  if (type !== 'object') {
    return type;
  }
  return Object.prototype.toString
    .call(target)
    .replace(/^\[object (\S+)\]$/, '$1');
}
