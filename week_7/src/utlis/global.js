// 換算金錢
export function currency(val, symbol = '') {
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
}

// 電話驗證
export const phoneRegExp = /^09\d{2}[ -]?\d{3}[ -]?\d{3}$/;

export const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

export default {};
