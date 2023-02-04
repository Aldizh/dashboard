// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import ParticlesBg from 'particles-bg'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState, useEffect } from 'react'
import useDataApi from '../../hooks/useData'
import NavBar from '../NavBar'
import Footer from '../shared/Footer'
import News from '../shared/News'

import Price from './Price'
import Crypto from './Crypto'
import Compared from './Compared'

import {
  getApiUrl,
  getFundamentalsUrl,
  isHistoricalStockChart,
  isHistoricalCryptoChart,
  isComparisonStockChart
} from './utils'

const Main = ({ classes }) => {
  const [symbol, setSymbol] = useState("") // set while typing
  const [search, setSearch] = useState("") // ticker symbol
  const [seriesType, setSeriesType] = useState("") // chart type (e.g historical crypto, spy vs aapl)
  const [apiError, setApiError] = useState("")

  const resetState = () => {
    setSearch('')
    setSymbol('')
    setApiError('')
  }

  const handleSelectChange = (event) => {
    resetState()
    setSeriesType(event.target.value)
    event.preventDefault() // prevent bubbling up
  }

  // Historic data for the search term
  const {
    data,
    isLoading,
    isError,
    updateUrl: updateSeriesUrl
  } = useDataApi(
    search,
    getApiUrl(search, seriesType)
  )

  // News articles related to the search term
  const {
    data: articleData,
    isLoading: articlesLoading,
    isError: articlesError,
    updateUrl: updateArticlesUrl
  } = useDataApi(
    search,
    getApiUrl(search, "NEWS_SENTIMENT")
  )
  const feed = articleData.data.feed

  // Crypto data related to the search term
  const {
    data: cryptoData,
    isLoading: cryptoLoading,
    isError: cryptoError,
    updateUrl: updateCryptoUrl
  } = useDataApi(
    search,
    getApiUrl(search, seriesType)
  )

  // Fundamentals data for the search term
  const {
    data: fundamentalsData,
    isLoading: fundamentalsIsLoading,
    isError: fundamentalsIsError,
    updateUrl: updateFundamentalsUrl,
  } = useDataApi(
    search,
    getFundamentalsUrl(search)
  )

  useEffect(() => {
    if (search && !isLoading && isHistoricalStockChart(seriesType)) {
      updateSeriesUrl(getApiUrl(search, seriesType))
    } else if (search && !isLoading && isComparisonStockChart(seriesType)) {
      updateSeriesUrl(getApiUrl(search, seriesType))
    } else if (search && !isLoading && isHistoricalCryptoChart(seriesType)) {
      updateCryptoUrl(getApiUrl(search, seriesType))
      updateArticlesUrl(getApiUrl(search, "NEWS_SENTIMENT"))
    }
  }, [search, seriesType])

  const {
    Name,
    Exchange,
    Sector,
    MarketCapitalization,
    DividendYield
  } = fundamentalsData.data
  useEffect(() => {
    if (search && !fundamentalsIsLoading) {
      updateFundamentalsUrl(getFundamentalsUrl(search))
    }
  }, [search, seriesType])

  // Set corresponding errors if any from the above
  useEffect(() => {
    let newApiError =
      isError ||
      cryptoError ||
      fundamentalsIsError ||
      fundamentalsData.data.Note ||
      data.data.Note
    if (newApiError) {
      console.log('got an api error...', newApiError)
      setApiError('Daily Limit Reached') // most likely use case
    }
  }, [search, seriesType, data.data])

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.app}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            updateSeriesUrl(getApiUrl(search, seriesType))
          }}
        >
          <select
            onChange={handleSelectChange}
            style={{
              width: '170px',
              padding: '2px',
              fontSize: '14px',
            }}
          >
            <option value="">Select an option</option>
            <option value="DIGITAL_CURRENCY_DAILY">Historical Crypto Chart</option>
            <option value="TIME_SERIES_DAILY">Historical Price Chart (Premium)</option>
            <option value="TIME_SERIES_INTRADAY">Recent History vs SPY</option>
          </select>
          <input
            type="text"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
          />
          <button onClick={() => setSearch(symbol)} type="submit">
            Search
          </button>
        </form>
        <React.Fragment>
          {symbol && isComparisonStockChart(seriesType) && (
            <Compared
              search={search}
              symbol={symbol}
              apiError={apiError}
              isLoading={isLoading}
              seriesType={seriesType}
              Name={Name}
              Exchange={Exchange}
              MarketCapitalization={MarketCapitalization}
              DividendYield={DividendYield}
              Sector={Sector}
              data={data}
            />
          )}
          {symbol && isHistoricalStockChart(seriesType) && (
            <Price
              search={search}
              symbol={symbol}
              data={data}
              apiError={apiError}
              isLoading={isLoading}
              seriesType={seriesType}
            />
          )}
          {symbol && isHistoricalCryptoChart(seriesType) && (
            <>
              <Crypto
                search={search}
                symbol={symbol}
                data={cryptoData}
                apiError={apiError}
                isLoading={cryptoLoading}
                seriesType={seriesType}
              />
              <News
                feed={feed}
                symbol={symbol}
                articlesLoading={articlesLoading}
                articlesError={articlesError}
              />
            </>
          )}
        </React.Fragment>
      </div>
      <ParticlesBg type="circle" bg={true} />
      <Outlet />
      <Footer classes={classes} />
    </>
  )
}

export default Main
