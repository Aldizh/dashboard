enum chartKeys {
  dailyTimeSeries = "Time Series (15min)",
  monthlyTimeSeries = "Monthly Adjusted Time Series",
  digitalDailyCurrency = "Time Series (Digital Currency Daily)",
  metaData = "Meta Data"
}

type chartKeyTypes = {
  dailyTimeSeries: "Time Series (15min)",
  monthlyTimeSeries: "Monthly Adjusted Time Series",
  digitalDailyCurrency: "Time Series (Digital Currency Daily)",
  metaData: "Meta Data",
  information: "Information"

}

type StockDailyMetaData = {
  "1. Information": string,
  "2. Symbol": string,
  "3. Last Refreshed": string,
  "4. Interval": string,
  "5. Output Size": string,
  "6. Time Zone": string
}

type MonthlyDailyMetaData = {
  "1. Information": "Monthly Adjusted Prices and Volumes",
  "2. Symbol": "SPY",
  "3. Last Refreshed": "2023-09-14",
  "4. Time Zone": "US/Eastern"
}

type CryptoMetaData = {
  "1. Information"?: string
  "2. Digital Currency Code"?: string
  "3. Digital Currency Name"?: string
  "4. Market Code"?: string
  "5. Market Name"?: string
  "6. Last Refreshed"?: string
  "7. Time Zone"?: string
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
  "ExDividendDate": string,
  "Information": string
}

// union type
type MetaData = StockDailyMetaData | MonthlyDailyMetaData | CryptoMetaData | FundamentalsMetaData

type DailyTimeSeriesValues = {
  ["1. open"]: number;
  ["2. high"]: number;
  ["3. low"]: number;
  ["4. close"]: number;
  ["5. volume"]: number;
};

type MonthlyTimeSeriesValues = {
  ["1. open"]: string,
  ["2. high"]: string,
  ["3. low"]: string,
  ["4. close"]: string,
  ["5. adjusted close"]:  string,
  ["6. volume"]: string,
  ["7. dividend amount"]: string
}

type TimeSeriesCryptoDaily = Record<string,
  {
    ["1a. open (CNY)"]: string,
    ["1b. open (USD)"]: string,
    ["2a. high (CNY)"]: string,
    ["2b. high (USD)"]: string,
    ["3a. low (CNY)"]: string,
    ["3b. low (USD)"]: string,
    ["4a. close (CNY)"]: string,
    ["4b. close (USD)"]: string,
    ["5. volume"]: string,
    ["6. market cap (USD)"]: string
}>

// Generic
type TimeSeries<T> = {
  [timestamp: string]: Record<string, T>;
};

type ChartData =
  {
    [key: string]: TimeSeries<DailyTimeSeriesValues | MonthlyTimeSeriesValues | TimeSeriesCryptoDaily> |
    MonthlyDailyMetaData | CryptoMetaData | FundamentalsMetaData | string,
}

type SearchDataMatch =  {
  "1. symbol": string,
  "2. name": string,
  "3. type": string,
  "4. region": string,
  "5. marketOpen": string,
  "6. marketClose": string,
  "7. timezone": string,
  "8. currency": string,
  "9. matchScore": string
}

export type {
  MetaData,
  ChartData,
  FundamentalsMetaData,
  chartKeyTypes,
  SearchDataMatch
}

export {
  chartKeys
}