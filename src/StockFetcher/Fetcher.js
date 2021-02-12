// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Canvas from "./Canvas"
import useDataApi from "../hooks/useData"

const APLHA_API_KEY = '1PXX8A1J2QJQFTBP'
const STOCK_SYMBOL = 'C'

const getQueryUrl = (symbol) => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=Daily&apikey=${APLHA_API_KEY}`
}

function throttle(func, delay) {
  let timeout = null
  return function(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args)
        timeout = null
      }, delay)
    }
  }
}

function Fetcher() {
  const [symbol, setSymbol] = useState(STOCK_SYMBOL);

  const { data: { data }, isLoading, isError, doFetch } = useDataApi(getQueryUrl(symbol))

  useEffect(() => {
    let lastTime = 0
    const now = new Date()
    const timeFrame = 2000 // throttle requests within this time frame

    if (!isLoading && (now - lastTime >= timeFrame)) {
      doFetch(getQueryUrl(symbol))
      lastTime = now
    }
  }, [symbol, doFetch])

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(getQueryUrl(symbol))
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <p>{data["Meta Data"] && data["Meta Data"].symbol}</p>
          {/* <p>{data["Time Series (5min)"]}</p> */}
          <Canvas symbol={symbol} data={data} />
        </div>
      )}
    </Fragment>
  );
}

export default Fetcher;
