// daily series type have price data over a longer period
const isDaily = (type) => type === 'TIME_SERIES_DAILY'

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
const numberWithCommas = (x) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export {
  isDaily,
  numberWithCommas
}