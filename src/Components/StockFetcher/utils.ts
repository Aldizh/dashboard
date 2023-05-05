import { TIME_SERIES_INTRADAY, TIME_SERIES_INTRADAY_EXTENDED, DIGITAL_CURRENCY_DAILY } from '../../utils/consts'

const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points
const BASE_URL = `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}`

const isComparisonStockChart = (type: string) => type === TIME_SERIES_INTRADAY
const isHistoricalStockChart = (type: string) => type === TIME_SERIES_INTRADAY_EXTENDED
const isHistoricalCryptoChart = (type: string) => type === DIGITAL_CURRENCY_DAILY

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
const numberWithCommas = (x: string | number) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const getApiUrl = (symbol: string, seriesType: string) => {
  switch (seriesType) {
    case TIME_SERIES_INTRADAY_EXTENDED:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY_EXTENDED}&symbol=${symbol}&interval=15min&slice=year1month1`
    case TIME_SERIES_INTRADAY:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY}&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true` // adjusted for dividends and stock split
    case DIGITAL_CURRENCY_DAILY:
      return `${BASE_URL}&function=${DIGITAL_CURRENCY_DAILY}&symbol=${symbol}&market=CNY`
    case 'NEWS_SENTIMENT': // TO DO: Needs to adjust based on series type
      return `${BASE_URL}&function=NEWS_SENTIMENT&tickers=CRYPTO:${symbol}`
    default:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY_EXTENDED}&symbol=${symbol}&outputsize=full`
  }
}

const getFundamentalsUrl = (symbol: string) => `${BASE_URL}&function=OVERVIEW&symbol=${symbol}`

export {
  getApiUrl,
  getFundamentalsUrl,
  isHistoricalStockChart,
  isHistoricalCryptoChart,
  isComparisonStockChart,
  numberWithCommas
}
