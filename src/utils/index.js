// @flow

export const isEmpty = (obj: Object | Array<*>): boolean => {
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return isEmpty(Object.keys(obj));
  return false;
};
