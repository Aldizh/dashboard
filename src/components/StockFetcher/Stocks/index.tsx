// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from "react"

import PriceChart from "./RecentPriceChart"
import { ChartData } from "../../../types"
import { MONTHLY_INTERVAL_ADJUSTED_KEY } from "../../../utils/consts"

// TO DO: Will need to accumulate different monthly slices to calculate oevr a longer time horizon
// Also because of 5 call limit it is hard to develop this feature
// But given the potential use cases will consider signing up
const Extended = (props: {
  search: string,
  data: ChartData,
  metrics: Record<string, string>,
  isLoading: boolean,
  seriesType: string
}) => {
  const {
    search,
    data,
    metrics,
    isLoading
  } = props

  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Enter ticker symbol and click search to get latest info...</div>}
      {search && isLoading && <div>Loading ...</div>}
      {search && !isLoading && (
        <PriceChart
          search={search}
          data={data}
          metrics={metrics}
          intervalKey={MONTHLY_INTERVAL_ADJUSTED_KEY}
        />
      )}
    </Fragment>
  )
}

export default Extended
