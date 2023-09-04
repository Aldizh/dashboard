import { TIME_SERIES_INTRADAY, TIME_SERIES_MONTHLY_ADJUSTED, DIGITAL_CURRENCY_DAILY } from '../../utils/consts'

const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points
const BASE_URL = `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}`

const isComparisonStockChart = (type: string) => type === TIME_SERIES_INTRADAY
const isHistoricalStockChart = (type: string) => type === TIME_SERIES_MONTHLY_ADJUSTED
const isHistoricalCryptoChart = (type: string) => type === DIGITAL_CURRENCY_DAILY

const getApiUrl = (symbol: string, seriesType: string) => {
  switch (seriesType) {
    case TIME_SERIES_MONTHLY_ADJUSTED:
      return `${BASE_URL}&function=${TIME_SERIES_MONTHLY_ADJUSTED}&symbol=${symbol}`
    case TIME_SERIES_INTRADAY:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY}&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true` // adjusted for dividends and stock split
    case DIGITAL_CURRENCY_DAILY:
      return `${BASE_URL}&function=${DIGITAL_CURRENCY_DAILY}&symbol=${symbol}&market=CNY`
    case 'NEWS_SENTIMENT': // TO DO: Needs to adjust based on series type
      return `${BASE_URL}&function=NEWS_SENTIMENT&tickers=CRYPTO:${symbol}`
    default:
      return `${BASE_URL}&function=${TIME_SERIES_INTRADAY}&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true` // adjusted for dividends and stock split
  }
}

const getFundamentalsUrl = (symbol: string) => `${BASE_URL}&function=OVERVIEW&symbol=${symbol}`

export {
  getApiUrl,
  getFundamentalsUrl,
  isHistoricalStockChart,
  isHistoricalCryptoChart,
  isComparisonStockChart
}
