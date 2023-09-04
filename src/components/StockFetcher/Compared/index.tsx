// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/
import React, { Fragment } from 'react'

import Comparison from './ComparisonChart'
import InfoCard from '../InfoCard'

import { getApiUrl } from '../utils'
import useDataApi from '../../../hooks/useData'
import { ChartData } from '../../../types'
import { INTRADAY_INTERVAL_KEY } from '../../../utils/consts'

const Standard = (props: {
  search: string
  symbol: string
  apiError: string
  isLoading: boolean
  seriesType: string
  data: {
    data: ChartData
  },
  metrics: {
    Name: string
    Exchange: string
    MarketCapitalization: string
    DividendYield: string,
    DividendDate: string,
    QuarterlyRevenueGrowthYOY: string,
    QuarterlyEarningsGrowthYOY: string,
    Sector: string
  }
}) => {
  const {
    search,
    symbol,
    apiError,
    isLoading,
    seriesType,
    data,
    metrics
  } = props

  // S&P data fetch called on render and series type change
  // (no need for fundamentals, used for comparison)
  const spyData = useDataApi(
    'SPY',
    getApiUrl('SPY', seriesType)
  )

  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Click search to get data for ticker symbol...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <div>
          {seriesType && (
            <>
              <p style={{ fontSize: 16 }}>Showing data for {symbol}</p>
              <InfoCard metrics={metrics} />
              <Comparison
                search={search}
                data={data.data}
                spyData={spyData.data.data}
                symbol={symbol}
                intervalKey={INTRADAY_INTERVAL_KEY}
              />
            </>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default Standard
