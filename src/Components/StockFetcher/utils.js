import { TIME_SERIES_INTRADAY, TIME_SERIES_DAILY, DIGITAL_CURRENCY_DAILY } from '../../utils/consts'

const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points
const BASE_URL = `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}`

const isComparisonStockChart = (type) => type === TIME_SERIES_INTRADAY
const isHistoricalStockChart = (type) => type === TIME_SERIES_DAILY
const isHistoricalCryptoChart = (type) => type === DIGITAL_CURRENCY_DAILY

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
const numberWithCommas = (x) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const getApiUrl = (symbol, seriesType) => {
  switch (seriesType) {
    case TIME_SERIES_DAILY:
      return `${BASE_URL}&function=${TIME_SERIES_DAILY}&symbol=${symbol}&outputsize=full`
    case TIME_SERIES_INTRADAY:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY}&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true` // adjusted for dividends and stock split
    case DIGITAL_CURRENCY_DAILY:
      return `${BASE_URL}&function=${DIGITAL_CURRENCY_DAILY}&symbol=${symbol}&market=CNY`
    case 'NEWS_SENTIMENT': // TO DO: Needs to adjust based on series type
      return `${BASE_URL}&function=NEWS_SENTIMENT&tickers=CRYPTO:${symbol}`
    default:
      return `${BASE_URL}&function=${TIME_SERIES_DAILY}&symbol=${symbol}&outputsize=full`
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
