// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Canvas from './Canvas'
import useDataApi from 'hooks/useData'

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

function Extended() {
  return (
    <Fragment>
      <div>Coming Soon</div>
    </Fragment>
  )
}

export default Extended
