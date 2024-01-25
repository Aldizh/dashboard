import { useState, useEffect, useReducer } from "react"
import axios from "axios"

import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  TIME_SERIES_INTRADAY,
  TIME_SERIES_MONTHLY_ADJUSTED,
  OVERVIEW,
  DIGITAL_CURRENCY_DAILY,
} from "../utils/consts"
import { ChartData } from "../types"

type Action = {
  type: string,
  payload?: object
}

// TO DO: Replace any with actual type
const dataFetchReducer = (state: any, action: Action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

// Define expected data format from the API
const getDefaultState = <T extends string>(url: T): any => {
  if (url.includes(TIME_SERIES_INTRADAY)) {
    return {
      data: {
        "Meta Data": {
          "1. Information": "Intraday (15min) open, high, low, close prices and volume",
          "2. Symbol": "SPY",
          "3. Last Refreshed": "2021-12-02 20:00:00",
          "4. Interval": "15min",
          "5. Output Size": "Full size",
          "6. Time Zone": "US/Eastern"
        },
        "Time Series (15min)": {
          "2021-10-22 04:15:00": {
            "1. open": 70.1025,
            "2. high": 73.1825,
            "3. low": 69.1825,
            "4. close": 71.0543,
            "5. volume": 101
          }
        }
      }
    }
  } else if (url.includes(TIME_SERIES_MONTHLY_ADJUSTED)) {
    return {
      data: {
        "Meta Data": {
          "1. Information": "Monthly Adjusted Prices and Volumes",
          "2. Symbol": "SPY",
          "3. Last Refreshed": "2023-09-14",
          "4. Time Zone": "US/Eastern"
        },
        "Monthly Adjusted Time Series": {
          "2023-09-14": {
            "1. open": "453.1700",
            "2. high": "453.6700",
            "3. low": "442.7500",
            "4. close": "450.3600",
            "5. adjusted close": "450.3600",
            "6. volume": "586583595",
            "7. dividend amount": "0.0000"
          }
        }
      }
    }
  } else if (url.includes(DIGITAL_CURRENCY_DAILY)) {
    return {
      data: {
        "Meta Data": {
          "1. Information": "Daily Prices and Volumes for Digital Currency",
          "2. Digital Currency Code": "ETH",
          "3. Digital Currency Name": "Ethereum",
          "4. Market Code": "CNY",
          "5. Market Name": "Chinese Yuan",
          "6. Last Refreshed": "2023-09-14 00:00:00",
          "7. Time Zone": "UTC"
        },
        "Time Series (Digital Currency Daily)": {
          "2023-09-14": {
            "1a. open (CNY)": "11692.14753000",
            "1b. open (USD)": "1607.61000000",
            "2a. high (CNY)": "11838.98940000",
            "2b. high (USD)": "1627.80000000",
            "3a. low (CNY)": "11688.07465000",
            "3b. low (USD)": "1607.05000000",
            "4a. close (CNY)": "11806.04271000",
            "4b. close (USD)": "1623.27000000",
            "5. volume": "15747.83960000",
            "6. market cap (USD)": "15747.83960000"
          }
        }
      }
    }
  } else if (url.includes(OVERVIEW)) {
    return {
      data: {
        "Meta Data": {
          "Symbol": "MSFT",
          "AssetType": "Common Stock",
          "Name": "Microsoft Corporation",
          "Description": "Microsoft Corporation is an American multinational technology company which produces computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 21 in the 2020 Fortune 500 rankings of the largest United States corporations by total revenue; it was the world's largest software maker by revenue as of 2016. It is considered one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Amazon, and Facebook.",
          "CIK": "789019",
          "Exchange": "NASDAQ",
          "Currency": "USD",
          "Country": "USA",
          "Sector": "TECHNOLOGY",
          "Industry": "SERVICES-PREPACKAGED SOFTWARE",
          "Address": "ONE MICROSOFT WAY, REDMOND, WA, US",
          "FiscalYearEnd": "June",
          "LatestQuarter": "2023-06-30",
          "MarketCapitalization": "2496845054000",
          "EBITDA": "102022996000",
          "PERatio": "34.68",
          "PEGRatio": "2.275",
          "BookValue": "27.75",
          "DividendPerShare": "2.72",
          "DividendYield": "0.0082",
          "EPS": "9.69",
          "RevenuePerShareTTM": "28.46",
          "ProfitMargin": "0.342",
          "OperatingMarginTTM": "0.418",
          "ReturnOnAssetsTTM": "0.142",
          "ReturnOnEquityTTM": "0.388",
          "RevenueTTM": "211914998000",
          "GrossProfitTTM": "135620000000",
          "DilutedEPSTTM": "9.69",
          "QuarterlyEarningsGrowthYOY": "0.202",
          "QuarterlyRevenueGrowthYOY": "0.083",
          "AnalystTargetPrice": "359.97",
          "TrailingPE": "34.68",
          "ForwardPE": "27.03",
          "PriceToSalesRatioTTM": "9.14",
          "PriceToBookRatio": "11.05",
          "EVToRevenue": "9.21",
          "EVToEBITDA": "18.55",
          "Beta": "0.905",
          "52WeekHigh": "366.01",
          "52WeekLow": "211.39",
          "50DayMovingAverage": "332.48",
          "200DayMovingAverage": "291.76",
          "SharesOutstanding": "7429760000",
          "DividendDate": "2023-09-14",
          "ExDividendDate": "2023-08-16"
        }
      }
    }
  } else {
    return {
      data: {
        "Meta Data": {
          "Symbol": "MSFT",
          "AssetType": "Common Stock",
          "Name": "Microsoft Corporation",
          "Description": "Microsoft Corporation is an American multinational technology company which produces computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 21 in the 2020 Fortune 500 rankings of the largest United States corporations by total revenue; it was the world's largest software maker by revenue as of 2016. It is considered one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Amazon, and Facebook.",
          "CIK": "789019",
          "Exchange": "NASDAQ",
          "Currency": "USD",
          "Country": "USA",
          "Sector": "TECHNOLOGY",
          "Industry": "SERVICES-PREPACKAGED SOFTWARE",
          "Address": "ONE MICROSOFT WAY, REDMOND, WA, US",
          "FiscalYearEnd": "June",
          "LatestQuarter": "2023-06-30",
          "MarketCapitalization": "2496845054000",
          "EBITDA": "102022996000",
          "PERatio": "34.68",
          "PEGRatio": "2.275",
          "BookValue": "27.75",
          "DividendPerShare": "2.72",
          "DividendYield": "0.0082",
          "EPS": "9.69",
          "RevenuePerShareTTM": "28.46",
          "ProfitMargin": "0.342",
          "OperatingMarginTTM": "0.418",
          "ReturnOnAssetsTTM": "0.142",
          "ReturnOnEquityTTM": "0.388",
          "RevenueTTM": "211914998000",
          "GrossProfitTTM": "135620000000",
          "DilutedEPSTTM": "9.69",
          "QuarterlyEarningsGrowthYOY": "0.202",
          "QuarterlyRevenueGrowthYOY": "0.083",
          "AnalystTargetPrice": "359.97",
          "TrailingPE": "34.68",
          "ForwardPE": "27.03",
          "PriceToSalesRatioTTM": "9.14",
          "PriceToBookRatio": "11.05",
          "EVToRevenue": "9.21",
          "EVToEBITDA": "18.55",
          "Beta": "0.905",
          "52WeekHigh": "366.01",
          "52WeekLow": "211.39",
          "50DayMovingAverage": "332.48",
          "200DayMovingAverage": "291.76",
          "SharesOutstanding": "7429760000",
          "DividendDate": "2023-09-14",
          "ExDividendDate": "2023-08-16"
        }
      }
    }
  }
}

/* TO DO: Right now alpha advantage (our stock market data source)
  has daily threshold of 5 calls per minute. We need to check other
  open APIs or consider a paid plan for the full features.
*/
const useDataApi = (search: string, initialUrl: string) => {
  const [url, setUrl] = useState<string>(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    ...getDefaultState(url)
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })
      try {
        const result: {
          data: ChartData
        } = await axios(url)

        // We hit the threshold of 5 calls per minute
        if (result.data.Information) dispatch({ type: FETCH_FAILURE })

        dispatch({ type: FETCH_SUCCESS, payload: result.data })
      } catch (error) {
        dispatch({ type: FETCH_FAILURE })
      }
    }

    if (search) fetchData()
  }, [url])

  const updateUrl = (url: string) => setUrl(url)

  return { ...state, updateUrl }
}

export default useDataApi
