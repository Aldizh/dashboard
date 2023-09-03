// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from 'react'
import PriceChart from './PriceChart'
import { ChartData } from '../../../types'

// TO DO: Will need to accumulate different monthly slices to calculate over a longer time horizon
// Also because of 5 call limit it is hard to develop this feature
// But given the potential use cases will consider signing up
const Extended = (props: {
  search: string,
  symbol: string,
  data: {
    data: ChartData
  },
  apiError: string,
  isLoading: boolean
}) => {
  const {
    search, // final search term (used to get data)
    symbol, // tracked
    data,
    apiError,
    isLoading
  } = props
  const cryptoTimeSeries = data.data['Time Series (Digital Currency Daily)']
  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Click search to get latest info...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && cryptoTimeSeries && (
        <PriceChart
          search={search}
          data={data.data}
          symbol={symbol}
        />
      )}
    </Fragment>
  )
}

export default Extended
