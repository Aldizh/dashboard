// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from 'react'
import useDataApi from 'hooks/useData'
import Extended from './Extended'
import Standard from './Standard'

const API_KEY = '1PXX8A1J2QJQFTBP'
const TICKER = 'JPM'
const interval = '15min' // time interval between two consecutive data points
const outputSize = 'full' // number of data points
const overView = 'OVERVIEW' // type of query

// helpers
const isExtended = (type) => type === "TIME_SERIES_INTRADAY_EXTENDED"

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const initialTimeSeriesData = {
  data: { 'Meta Data': { Symbol: "SPY" }, 'Time Series (15min)': {} },
}
const initialFundamentals = {
  data: { Name: '', Exchange: '', Sector: '', MarketCapitalization: '' },
}

const getSeriesUrl = (symbol, seriesType) => {
  // TO DO: Extend this to include multiple months
  // Maybe surface it via the UI?
  const slice = "year1month1"
  const baseUrl = 'https://www.alphavantage.co/query'
  let final = `${baseUrl}?function=${seriesType}&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${API_KEY}&adjusted=true`
  if (isExtended(seriesType)) final += `&slice=${slice}`
  return final
}

const getFundamentalsUrl = (symbol) => {
  const baseUrl = 'https://www.alphavantage.co/query'
  return `${baseUrl}?function=${overView}&symbol=${symbol}&apikey=${API_KEY}`
}

function Main() {
  const [symbol, setSymbol] = useState(TICKER) // set on type
  const [search, setSearch] = useState(TICKER) // set on click
  const [seriesType, setSeriesType] = useState('TIME_SERIES_INTRADAY');
  const [apiError, setApiError] = useState('')

  const handleSelectChange = (event) => {
    setSeriesType(event.target.value)
    setSearch("")
    setSymbol("")
    setApiError("")
    event.preventDefault() // prevent bubbling up
  }

  // S&P data fetch called on render and series type change
  const spyData = useDataApi('SPY', seriesType, getSeriesUrl('SPY', seriesType), initialTimeSeriesData)

  // Full data for the search term
  const { data, isLoading, isError, updateUrl } = useDataApi(
    search,
    seriesType,
    getSeriesUrl(search, seriesType),
    initialTimeSeriesData
  )
  useEffect(() => {
    if (search && !isLoading) {
      updateUrl(getSeriesUrl(search, seriesType))
    }
  }, [search, seriesType])
  // Fundamentals data for the search term
  const {
    data: fundamentalsData,
    isLoading: fundamentalsIsLoading,
    isError: fundamentalsIsError,
    updateUrl: updateFundamentalsUrl,
  } = useDataApi(search, seriesType, getFundamentalsUrl(search), initialFundamentals)
  const {
    Name,
    Exchange,
    Sector,
    MarketCapitalization = 0,
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
      data.data.Note ||
      spyData.data.data.Note
    setApiError(Boolean(newApiError) ? "Daily Limit Reached": "")
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
          width: "147px",
          padding: "2px",
          fontSize: "14px"
        }}>
          <option value="TIME_SERIES_INTRADAY">Intraday</option>
          <option value="TIME_SERIES_INTRADAY_EXTENDED">Extended</option>
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
        {!isExtended(seriesType) && <Standard
          search={search}
          symbol={symbol}
          apiError={apiError}
          isLoading={isLoading}
          seriesType={seriesType}
          Name={Name}
          Exchange={Exchange}
          MarketCapitalization={MarketCapitalization}
          Sector={Sector}
          data={data}
          spyData={spyData}
        />}
        {isExtended(seriesType) && <Extended/>}
      </React.Fragment>
    </Fragment>
  )
}

export default Main
