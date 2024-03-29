// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/
import React, { Fragment } from "react"

import Comparison from "./ComparisonChart"
import InfoCard from "../InfoCard"

import { getApiUrl } from "../utils"
import useDataApi from "../../../hooks/useData"
import { ChartData } from "../../../types"
import { INTRADAY_INTERVAL_KEY } from "../../../utils/consts"

import type { Metrics } from  "../../../types/Stocks"

const Standard = (props: {
  search: string
  isLoading: boolean
  seriesType: string
  data: ChartData
  metrics: Metrics
}) => {
  const {
    search,
    isLoading,
    seriesType,
    data,
    metrics
  } = props

  // S&P data fetch called on render and series type change
  // (no need for fundamentals, used for comparison)
  const spyData = useDataApi(
    "SPY",
    getApiUrl("SPY", seriesType)
  )

  return (
    <Fragment>
      {!search && <div style={{ fontSize: 18 }}>Click search to get data for ticker symbol...</div>}
      {search && isLoading && <div>Loading ...</div>}
      {search && !isLoading && (
        <div>
          {seriesType && (
            <>
              <InfoCard metrics={metrics} />
              <Comparison
                search={search}
                data={data}
                spyData={spyData.data}
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
