enum chartKeys {
  dailyTimeSeries = 'Time Series (15min)',
  monthlyTimeSeries = 'Monthly Adjusted Time Series',
  digitalDailyCurrency = 'Time Series (Digital Currency Daily)',
  metaData = 'Meta Data'
}

type StockMetaData = {
  "1. Information": "Monthly Adjusted Prices and Volumes",
  "2. Symbol": "SPY",
  "3. Last Refreshed": "2023-09-14",
  "4. Time Zone": "US/Eastern"
}

type CryptoMetaData = {
  ['1. Information']: string
  ['2. Digital Currency Code']: string
  ['3. Digital Currency Name']: string
  ['4. Market Code']: string
  ['5. Market Name']: string
  ['6. Last Refreshed']: string
  ['7. Time Zone']: string
}

type FundamentalsMetaData = {
  "Symbol": string,
  "AssetType": string,
  "Name": string,
  "Description": string,
  "CIK": string,
  "Exchange": string,
  "Currency": string,
  "Country": string,
  "Sector": string,
  "Industry": string,
  "Address": string,
  "FiscalYearEnd": string,
  "LatestQuarter": string,
  "MarketCapitalization": string,
  "EBITDA": string,
  "PERatio": string,
  "PEGRatio": string,
  "BookValue": string,
  "DividendPerShare": string,
  "DividendYield": string,
  "EPS": string,
  "RevenuePerShareTTM": string,
  "ProfitMargin": string,
  "OperatingMarginTTM": string,
  "ReturnOnAssetsTTM": string,
  "ReturnOnEquityTTM": string,
  "RevenueTTM": string,
  "GrossProfitTTM": string,
  "DilutedEPSTTM": string,
  "QuarterlyEarningsGrowthYOY": string,
  "QuarterlyRevenueGrowthYOY": string,
  "AnalystTargetPrice": string,
  "TrailingPE": string,
  "ForwardPE": string,
  "PriceToSalesRatioTTM": string,
  "PriceToBookRatio": string,
  "EVToRevenue": string,
  "EVToEBITDA": string,
  "Beta": string,
  "52WeekHigh": string,
  "52WeekLow": string,
  "50DayMovingAverage": string,
  "200DayMovingAverage":string,
  "SharesOutstanding": string,
  "DividendDate": string,
  "ExDividendDate": string
}

// union type
type MetaData = StockMetaData | CryptoMetaData | FundamentalsMetaData

type TimeSeriesSocksDaily = {
  [chartKeys.dailyTimeSeries]: Record<string, {
    ['1. open']: string,
    ['2. high']: string,
    ['3. low']: string,
    ['4. close']: string,
  }>
};

type TimeSeriesSocksMonthly = {
  [chartKeys.monthlyTimeSeries]: Record<string, {
    ['1. open']: string,
    ['2. high']: string,
    ['3. low']: string,
    ['4. close']: string,
    ['5. adjusted close']:  string,
    ['6. volume']: string,
    ['7. dividend amount']: string
  }>
};

type TimeSeriesCryptoDaily = {
  [chartKeys.digitalDailyCurrency]: Record<string, {
    ['1a. open (CNY)']: string,
    ['1b. open (USD)']: string,
    ['2a. high (CNY)']: string,
    ['2b. high (USD)']: string,
    ['3a. low (CNY)']: string,
    ['3b. low (USD)']: string,
    ['4a. close (USD)']: string,
    ['4b. close (USD)']: string,
    ['5. volume']: string,
    ['6. market cap (USD)']: string
  }>
}

interface ChartData {
  [chartKeys.dailyTimeSeries]?: TimeSeriesSocksDaily,
  [chartKeys.digitalDailyCurrency]?: TimeSeriesCryptoDaily,
  [chartKeys.monthlyTimeSeries]?: TimeSeriesSocksMonthly,
  [chartKeys.metaData]?: CryptoMetaData,
  Information?: string
}

export type {
  MetaData,
  ChartData,
  chartKeys
}