export function fullFormat(value) {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function shortFormat(value) {
  if (value > 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (value > 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (value > 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return value;
}
