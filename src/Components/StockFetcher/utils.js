const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points
const BASE_URL = `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}`

const isHistoricalStockChart = (type) => type === 'TIME_SERIES_DAILY'
const isHistoricalCryptoChart = (type) => type === 'DIGITAL_CURRENCY_DAILY'
const isComparisonStockChart = (type) => type === 'TIME_SERIES_INTRADAY'

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
const numberWithCommas = (x) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const getApiUrl = (symbol, seriesType) => {
  switch (seriesType) {
    case 'TIME_SERIES_DAILY':
      return `${BASE_URL}&function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full`
    case 'TIME_SERIES_INTRADAY':
      return `${BASE_URL}&function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true`
    case 'DIGITAL_CURRENCY_DAILY':
      return `${BASE_URL}&function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=CNY`
    default:
      return `${BASE_URL}&function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full` 
  }
}
const getFundamentalsUrl = (symbol) => `${BASE_URL}&function=OVERVIEW&symbol=${symbol}`

export {
  getApiUrl,
  getFundamentalsUrl,
  isHistoricalStockChart,
  isHistoricalCryptoChart,
  isComparisonStockChart,
  numberWithCommas
}