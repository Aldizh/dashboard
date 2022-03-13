// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from 'react'
import useDataApi from '../../hooks/useData'
import Price from './Price'
import Compared from './Compared'

import { isDaily } from './utils'

const DEFAULT_TICKER = 'JPM'
const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points

const getSeriesUrl = (symbol, seriesType) => {
  // TO DO: Extend this to include multiple months
  // Maybe surface it via the UI?
  const baseUrl = 'https://www.alphavantage.co/query'
  const regular = `${baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&apikey=${process.env.API_KEY}&adjusted=true`
  const full = `${baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.API_KEY}`
  return isDaily(seriesType) ? full : regular
}

const getFundamentalsUrl = (symbol) => {
  const baseUrl = 'https://www.alphavantage.co/query'
  return `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_KEY}`
}

function Main() {
  const [symbol, setSymbol] = useState(DEFAULT_TICKER) // set while typing
  const [search, setSearch] = useState(DEFAULT_TICKER) // ticker symbol
  const [seriesType, setSeriesType] = useState('TIME_SERIES_DAILY')
  const [apiError, setApiError] = useState('')

  const handleSelectChange = (event) => {
    setSeriesType(event.target.value)
    setSearch('')
    setSymbol('')
    setApiError('')
    event.preventDefault() // prevent bubbling up
  }

  // Full data and fundamentals data for the search term
  const {
    data,
    isLoading,
    isError,
    updateUrl
  } = useDataApi(
    search,
    getSeriesUrl(search, seriesType)
  )
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
      updateUrl(getSeriesUrl(search, seriesType))
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
    <Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          updateUrl(getSeriesUrl(search, seriesType))
        }}
      >
        <select
          onChange={handleSelectChange}
          style={{
            width: '147px',
            padding: '2px',
            fontSize: '14px',
          }}
        >
          <option value="TIME_SERIES_DAILY">Price Chart</option>
          <option value="TIME_SERIES_INTRADAY">Compared to SPY</option>
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
    </Fragment>
  )
}

export default Main
