// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Canvas from './ComparisonChart'

import { isDaily, numberWithCommas } from './utils'
import useDataApi from '../../hooks/useData'

const DEFAULT_INTERVAL = '15min' // time interval between two consecutive data points

const getSeriesUrl = (symbol, seriesType) => {
  // TO DO: Extend this to include multiple months
  // Maybe surface it via the UI?
  const baseUrl = 'https://www.alphavantage.co/query'
  const regular = `${baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${DEFAULT_INTERVAL}&outputsize=full&apikey=${process.env.API_KEY}&adjusted=true`
  const full = `${baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.API_KEY}`
  return isDaily(seriesType) ? full : regular
}

const Standard = (props) => {
  const {
    search,
    symbol,
    apiError,
    isLoading,
    seriesType,
    Name,
    Exchange,
    MarketCapitalization,
    DividendYield,
    Sector,
    data,
  } = props

  // S&P data fetch called on render and series type change
  // (no need for fundamentals, used for comparison)
  const spyData = useDataApi(
    'SPY',
    getSeriesUrl('SPY', seriesType)
  )

  return (
    <Fragment>
      {!search && <div>Click search to get data for ticker symbol...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <div>
          {seriesType && (
            <div>
              <p>{symbol}</p>
              <div
                style={{
                  margin: '10px auto',
                  width: '70%',
                }}
              >
                {/* {metaData.map(el => (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {el.split(". ")[1]}
                      </Typography>
                    </CardContent>
                  </Card>
                ))} */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                      {Name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Exchange: {Exchange}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Sector: {Sector}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Market CAP: ${numberWithCommas(MarketCapitalization)}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Dividend Yield: {parseFloat(DividendYield) * 100}%
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <Canvas
                search={search}
                data={data.data}
                spyData={spyData.data.data}
                symbol={symbol}
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default Standard
