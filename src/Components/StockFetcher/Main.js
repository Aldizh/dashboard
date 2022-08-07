// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import ParticlesBg from 'particles-bg'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState, useEffect } from 'react'
import useDataApi from '../../hooks/useData'
import NavBar from '../NavBar'
import Footer from '../shared/Footer'

import Price from './Price'
import Compared from './Compared'

import { isDaily } from './utils'

const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points
const BASE_URL = `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}`

const getSeriesUrl = (symbol, seriesType) => {
  // TO DO: Extend this to include multiple months
  // Maybe surface it via the UI?
  const regular = `${BASE_URL}&function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&adjusted=true`
  const full = `${BASE_URL}&function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full`
  return isDaily(seriesType) ? full : regular
}

const getFundamentalsUrl = (symbol) => `${BASE_URL}&function=OVERVIEW&symbol=${symbol}`

// TO DO: Incorporate crypto into options selection
const getCryptoUrl = (symbol) => `${BASE_URL}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=CNY`

const Main = ({ classes }) => {
  const [symbol, setSymbol] = useState("") // set while typing
  const [search, setSearch] = useState("") // ticker symbol
  const [seriesType, setSeriesType] = useState('TIME_SERIES_DAILY')
  const [apiError, setApiError] = useState('')

  const handleSelectChange = (event) => {
    setSeriesType(event.target.value)
    setSearch('')
    setSymbol('')
    setApiError('')
    event.preventDefault() // prevent bubbling up
  }

  // Full data for the search term
  const {
    data,
    isLoading,
    isError,
    updateUrl: updateSeriesUrl
  } = useDataApi(
    search,
    getSeriesUrl(search, seriesType)
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
    if (search && !isLoading) {
      updateSeriesUrl(getSeriesUrl(search, seriesType))
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
      fundamentalsIsError ||
      fundamentalsData.data.Note ||
      data.data.Note
    setApiError(Boolean(newApiError) ? 'Daily Limit Reached' : '')
  }, [search, seriesType, data.data])

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.app}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            updateSeriesUrl(getSeriesUrl(search, seriesType))
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
            <option value="TIME_SERIES_DAILY">Historical Price Chart</option>
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
          {!isDaily(seriesType) && (
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
          {isDaily(seriesType) && (
            <Price
              search={search}
              symbol={symbol}
              data={data}
              apiError={apiError}
              isLoading={isLoading}
              seriesType={seriesType}
            />
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
