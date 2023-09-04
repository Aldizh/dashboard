// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from 'react'

import PriceChart from './RecentPriceChart'
import { ChartData } from '../../../types'
import { MONTHLY_INTERVAL_ADJUSTED_KEY } from '../../../utils/consts'

// TO DO: Will need to accumulate different monthly slices to calculate oevr a longer time horizon
// Also because of 5 call limit it is hard to develop this feature
// But given the potential use cases will consider signing up
const Extended = (props: {
  search: string,
  symbol: string,
  data: {
    data: ChartData
  },
  metrics: Record<string, string>,
  apiError: string // TO DO: specify the type
  isLoading: boolean
}) => {
  const {
    search,
    symbol,
    data,
    metrics,
    apiError,
    isLoading
  } = props

  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Enter ticker symbol and click search to get latest info...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <PriceChart
          search={search}
          data={data.data}
          metrics={metrics}
          symbol={symbol}
          intervalKey={MONTHLY_INTERVAL_ADJUSTED_KEY}
        />
      )}
    </Fragment>
  )
}

export default Extended
