// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import ParticlesBg from "particles-bg"
import axios from "axios"

import { Theme } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";

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

import { ChartData, FundamentalsMetaData, SearchDataMatch } from "../../types"

const Fetcher = () => {
  const [userInput, setUserInput] = useState("") // tracks user input
  const [search, setSearch] = useState("") // final ticker symbol
  const [seriesType, setSeriesType] = useState("") // chart type (e.g historical crypto, spy vs aapl)
  const [apiError, setApiError] = useState("")

  const [bestMatches, setBestMatches] = useState<SearchDataMatch[] | []>([])

  const matchValue = bestMatches[0] ? bestMatches[0]["1. symbol"] : ""

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
    const fetchData = async () => {
      const { data }: { data: { bestMatches: SearchDataMatch[] }} = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${process.env.API_KEY}`)
      if (data.bestMatches) setBestMatches(data.bestMatches)
    }

    if (userInput && !isHistoricalCryptoChart(seriesType)) fetchData()
  }, [userInput])

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

  const handleSearchSelect = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setUserInput(value)
  };

  return (
    <>
      <Container
        sx={(theme: Theme) => ({
          textAlign: "center",
          paddingTop: theme.spacing(2)
        })}
      >
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
            onChange={(event) => {
              const searchVal = event.target.value
              setUserInput(searchVal)}
            }
          />
          <button onClick={() => setSearch(userInput)} type="submit">
            Search
          </button>
          <Container
            sx={(theme: Theme) => ({
              paddingTop: theme.spacing(2),
            })}
          >
            { matchValue && !isHistoricalCryptoChart(seriesType) ?
              <FormControl>
                <InputLabel id="search-suggestions" color="info">Suggestions</InputLabel>
                <Select
                  label="Suggestions"
                  labelId="searchSuggestions"
                  id="search-suggestions"
                  value={matchValue}
                  onChange={handleSearchSelect}
                >
                  {bestMatches.map((company: SearchDataMatch) => (
                    <MenuItem
                      id={company["1. symbol"]}
                      key={company["1. symbol"]}
                      value={company["1. symbol"]}
                      style={{
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {company["2. name"]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> : <div /> }
          </Container>
        </form>
      </Container>
      <Container
        sx={(theme: Theme) => ({
          paddingBottom: theme.spacing(2),
        })}
      >
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
      </Container>
      <ParticlesBg
        type="circle"
        bg={true}
      />
      <Outlet />
    </>
  )
}

export default Fetcher
