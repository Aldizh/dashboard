// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Canvas from "./Canvas"
import useDataApi from "hooks/useData"

const APLHA_API_KEY = '1PXX8A1J2QJQFTBP'
const STOCK_SYMBOL = 'C'

const getQueryUrl = (symbol) => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=Daily&apikey=${APLHA_API_KEY}`
}

const metaChangeHandler = (response) => {
  let metaData = []
  let parsedRes = response["Meta Data"]
  if (!parsedRes) return []
  for (let el of Object.keys(parsedRes)) {
    metaData.push(`${el} - ${parsedRes[el]}`)
  }
  return metaData
}

function Fetcher() {
  const [symbol, setSymbol] = useState(STOCK_SYMBOL);
  const [metaData, setMetaData] = useState([])

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

  useEffect(() => {
    setMetaData(metaChangeHandler(data))
  }, [data])


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
          <div style={{ margin: '10px auto', width: '70%' }}>
            {metaData.map(el => (
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {el.split(". ")[1]}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* <p>{data["Time Series (5min)"]}</p> */}
          <Canvas symbol={symbol} data={data} />
        </div>
      )}
    </Fragment>
  );
}

export default Fetcher;
