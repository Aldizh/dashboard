// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { useState, useEffect } from "react"
import ParticlesBg from "particles-bg"
import { Outlet } from "react-router-dom"

import useDataApi from "../../hooks/useData"
import News from "../shared/News"
import ExtendedHistory from "./Stocks"
import Crypto from "./Crypto"
import Compared from "./Compared"

import {
  getApiUrl,
  getFundamentalsUrl,
  isHistoricalStockChart,
  isHistoricalCryptoChart,
  isComparisonStockChart
} from "./utils"

import { ChartData, FundamentalsMetaData } from "../../types"

const Fetcher = ({ classes }: { classes: ClassesType }) => {
  const [userInput, setUserInput] = useState("") // tracks user input
  const [search, setSearch] = useState("") // final ticker symbol
  const [seriesType, setSeriesType] = useState("") // chart type (e.g historical crypto, spy vs aapl)
  const [apiError, setApiError] = useState("")

  const resetState = () => {
    setSearch("")
    setUserInput("")
    setApiError("")
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    resetState()
    setSeriesType(event.target.value)
    event.preventDefault() // prevent bubbling up
  }

  // historical data tracking variable assignments
  let isLoading = false
  let isError = false
  let isCryptoLoading = false
  let isCryptoError = false

  let stockData: ChartData = {}
  let cryptoData: ChartData = {}

  let updateCryptoUrl: (url: string) => void
  let updateSeriesUrl: (url: string) => void = () => {}

  // Historical data for the search term (either cryto or stock)
  const historicalData: {
    data: ChartData,
    isLoading: boolean,
    isError: boolean,
    updateUrl: (url: string) => void
  } = useDataApi(
    search,
    getApiUrl(search, seriesType),
  )

  // load the correct data based on series type
  if (isHistoricalCryptoChart(seriesType)) {
    cryptoData = historicalData.data
    isCryptoLoading = historicalData.isLoading
    isCryptoError = historicalData.isError
    updateCryptoUrl = historicalData.updateUrl
  } else {
    stockData = historicalData.data
    isLoading = historicalData.isLoading
    isError = historicalData.isError
    updateSeriesUrl = historicalData.updateUrl
  }

  // fundamentals data (crypto is excluded)
  const fundamentals: {
    data: FundamentalsMetaData,
    isLoading: boolean,
    isError: boolean,
    updateUrl: (url: string) => void
  } = useDataApi(
    search,
    getFundamentalsUrl(search)
  )
  const {
    data: fundamentalsData,
    isLoading: isFundamentalsLoading,
    isError: isFundamentalsError,
    updateUrl: updateFundamentalsUrl
  } = fundamentals

  useEffect(() => {
    if (search && !isLoading && isHistoricalStockChart(seriesType)) {
      updateSeriesUrl(getApiUrl(search, seriesType))
    } else if (search && !isLoading && isComparisonStockChart(seriesType)) {
      updateSeriesUrl(getApiUrl(search, seriesType))
    } else if (search && !isLoading && isHistoricalCryptoChart(seriesType)) {
      updateCryptoUrl(getApiUrl(search, seriesType))
    }
  }, [search, seriesType])

  useEffect(() => {
    if (search && !isFundamentalsLoading && !isHistoricalCryptoChart(seriesType)) {
      updateFundamentalsUrl(getFundamentalsUrl(search))
    }
  }, [search, seriesType])

  // Set corresponding errors if any from the above
  useEffect(() => {
    const hasApiError =
      isError ||
      isCryptoError ||
      isFundamentalsError ||
      fundamentalsData?.Information ||
      stockData?.Information ||
      cryptoData?.Information
    if (hasApiError) {
      setApiError("Daily Limit Reached") // most likely use case
    }
  }, [search, seriesType])

  return (
    <>
      <div className={classes.cardGrid}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            updateSeriesUrl(getApiUrl(search, seriesType))
          }}
        >
          <select
            onChange={handleSelectChange}
            style={{
              width: "170px",
              padding: "2px",
              fontSize: "14px"
            }}
          >
            <option value="">Select an option</option>
            <option value="DIGITAL_CURRENCY_DAILY">Historical Crypto Chart</option>
            <option value="TIME_SERIES_MONTHLY_ADJUSTED">Recent Stock Price Chart</option>
            <option value="TIME_SERIES_INTRADAY">Recent History vs SPY</option>
          </select>
          <input
            type="text"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button onClick={() => setSearch(userInput)} type="submit">
            Search
          </button>
        </form>
        <React.Fragment>
          {search && !apiError && isComparisonStockChart(seriesType) && (
            <Compared
              search={search}
              data={stockData}
              isLoading={isLoading}
              seriesType={seriesType}
              metrics={fundamentalsData}
            />
          )}
          {search && !apiError && isHistoricalStockChart(seriesType) && (
            <ExtendedHistory
              search={search}
              data={stockData}
              isLoading={isLoading}
              seriesType={seriesType}
              metrics={fundamentalsData}
            />
          )}
          {search && !apiError && isHistoricalCryptoChart(seriesType) && (
            <>
              <Crypto
                search={search}
                data={cryptoData}
                isLoading={isCryptoLoading}
                seriesType={seriesType}
              />
              <News
                search={search}
                getApiUrl={getApiUrl}
              />
            </>
          )}
          {apiError && <b style={{color: "darkred"}}>{apiError}</b>}
        </React.Fragment>
      </div>
      <ParticlesBg
        type="circle"
        bg={true}
      />
      <Outlet />
    </>
  )
}

export default Fetcher
