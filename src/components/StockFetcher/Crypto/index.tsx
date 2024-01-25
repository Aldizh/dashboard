// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from "react"
import PriceChart from "./PriceChart"
import type { ChartData } from "../../../types"
import { chartKeys } from "../../../types"

// TO DO: Will need to accumulate different monthly slices to calculate over a longer time horizon
// Also because of 5 call limit it is hard to develop this feature
// But given the potential use cases will consider signing up
const Crypto = (props: {
  search: string,
  data: ChartData,
  isLoading: boolean,
  seriesType: string
}) => {
  const {
    search, // final search term (used to get data)
    data,
    isLoading
  } = props
  const cryptoTimeSeries = data[chartKeys.digitalDailyCurrency]
  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Click search to get latest info...</div>}
      {search && isLoading && <div>Loading ...</div>}
      {search && !isLoading && cryptoTimeSeries && (
        <PriceChart
          search={search}
          data={data}
        />
      )}
    </Fragment>
  )
}

export default Crypto
