// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Canvas from "./Canvas"
import useDataApi from "hooks/useData"

const API_KEY = '1PXX8A1J2QJQFTBP'
const TICKER = 'JPM'
const seriesType = 'TIME_SERIES_DAILY_ADJUSTED' // type of query
const overView = 'OVERVIEW' // type of query

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const initialTimeSeriesData = { data: { "Meta Data": { 'symbol': ''}, "Time Series (Daily)": {} }}
const initialFundamentals = { data: { Name: '', Exchange: '', Sector: '', MarketCapitalization: '' } }

const getSeriesData = (symbol) => {
  const baseUrl = 'https://www.alphavantage.co/query'
  return `${baseUrl}?function=${seriesType}&symbol=${symbol}&interval=Daily&apikey=${API_KEY}`
}

const getFundamentals = (symbol) => {
  const baseUrl = 'https://www.alphavantage.co/query'
  return `${baseUrl}?function=${overView}&symbol=${symbol}&apikey=${API_KEY}`
}

function Fetcher() {
  const [symbol, setSymbol] = useState(TICKER)
  const [search, setSearch] = useState('')

  const { data, isLoading, isError, doFetch } = useDataApi(getSeriesData(search), initialTimeSeriesData)
  const spyData = useDataApi(getSeriesData('SPY'), initialTimeSeriesData)
  
  useEffect(() => {
    if (search) {
      let lastTime = 0
      const now = new Date()
      const timeFrame = 2000 // throttle requests within this time frame
  
      if (!isLoading && (now - lastTime >= timeFrame)) {
        doFetch(getSeriesData(search))
        lastTime = now
      }
    }
  }, [search, doFetch])

    
  const {
    data: fundamentalsData,
    isLoading: fundamentalsIsLoading,
    isError: fundamentalsIsError,
    doFetch: fundamentalsFoFetch
  } = useDataApi(getFundamentals(search), initialFundamentals)
  const { Name, Exchange, Sector, MarketCapitalization = 0 } = fundamentalsData.data

  useEffect(() => {
    if (search) {
      let lastTime = 0
      const now = new Date()
      const timeFrame = 2000 // throttle requests within this time frame
  
      if (!fundamentalsIsLoading && (now - lastTime >= timeFrame)) {
        fundamentalsFoFetch(getFundamentals(search))
        lastTime = now
      }
    }
  }, [search, fundamentalsFoFetch])

  const apiError = isError || fundamentalsIsError || data.data.Note || fundamentalsData.data.Note

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(getSeriesData(search))
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
        />
        <button onClick={() => setSearch(symbol)} type="submit">Search</button>
      </form>
      {!search && <div>Click search to get data for ticker symbol...</div>}
      {apiError && <div>{data.data.Note}</div>}
      {search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <div>
          <p>{data["Meta Data"] && data["Meta Data"].symbol}</p>
          <div style={{ margin: '10px auto', width: '70%' }}>
            {/* {metaData.map(el => (
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {el.split(". ")[1]}
                  </Typography>
                </CardContent>
              </Card>
            ))} */}
            <Card variant="outlined">
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  {Name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Exchange: {Exchange}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Sector: {Sector}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Market CAP: ${numberWithCommas(MarketCapitalization)}
                </Typography>
              </CardContent>
            </Card>
          </div>
          {/* <p>{data["Time Series (5min)"]}</p> */}
          <Canvas search={search} data={data.data} spyData={spyData.data.data} />
        </div>
      )}
    </Fragment>
  );
}

export default Fetcher;
