// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Canvas from './ComparisonChart'
import { getApiUrl, numberWithCommas } from './utils'
import useDataApi from '../../hooks/useData'
import { MetaData, TimeSeries } from "../../types"

const Standard = (props: {
  search: string
  symbol: string
  apiError: string
  isLoading: boolean
  seriesType: string
  Name: string
  Exchange: string
  MarketCapitalization: string
  DividendYield: string
  Sector: string
  data: {
    data: {
      ['Meta Data']: MetaData
      ['Time Series (15min)']: TimeSeries
    }
  }
}) => {
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
    data
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
              <div
                style={{
                  margin: '10px auto',
                  width: '70%'
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
            </>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default Standard
