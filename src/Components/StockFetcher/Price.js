// Documentation for canvas js: https://canvasjs.com/docs
// Documentation for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from 'react'
import Canvas from "./PriceChart"

// TO DO: Will need to accumulate different monthly slices to calculate oevr a longer time horizon
// Also because of 5 call limit it is hard to develop this feature
// But given the potential use cases will consider signing up
const Extended = (props) => {
  const {
    search,
    symbol,
    data,
    apiError,
    isLoading
  } = props
  return (
    <Fragment>
      {!search && <div>Click search to get data for ticker symbol...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <Canvas
          search={search}
          data={data.data}
          symbol={symbol}
        />
      )}
    </Fragment>
  )
}

export default Extended
