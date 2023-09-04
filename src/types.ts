enum chartKeys {
  dailyTimeSeries = 'Time Series (15min)',
  digitalDailyCurrency = 'Time Series (Digital Currency Daily)',
  metaData = 'Meta Data'
}

// TO DO: Create a union type with crypto metadata
//        with conditional attributes so it can be reused
type MetaData = {
  ['1. Information']: string
  ['2. Symbol']: string
  ['3. Last Refreshed']: string
  ['4. Interval']: string
  ['5. Output Size']: string
  ['6. Time Zone']: string
};

type CryptoMetaData = {
  ['1. Information']: string
  ['2. Digital Currency Code']: string
  ['3. Digital Currency Name']: string
  ['4. Market Code']: string
  ['5. Market Name']: string
  ['6. Last Refreshed']: string
  ['7. Time Zone']: string
}

type TimeSeries = {
  [chartKeys.dailyTimeSeries]: Record<string, {
    ['1. open']: string,
    ['2. high']: string,
    ['3. low']: string,
    ['4. close']: string,
  }>
};

type TimeSeriesCrypto = Record<string, {
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

interface ChartData {
  [chartKeys.dailyTimeSeries]?: TimeSeries,
  [chartKeys.digitalDailyCurrency]?: TimeSeriesCrypto,
  [chartKeys.metaData]: CryptoMetaData
}

export type {
  ChartData,
  TimeSeriesCrypto,
  chartKeys
}