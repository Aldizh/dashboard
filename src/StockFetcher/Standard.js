// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Canvas from './Canvas'

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function Standard(props) {
  const  {
    search,
    symbol,
    apiError,
    isLoading,
    seriesType,
    Name,
    Exchange,
    MarketCapitalization,
    Sector,
    data,
    spyData
  } = props
  return (
    <Fragment>
      {!search && <div>Click search to get data for ticker symbol...</div>}
      {apiError && <div>{apiError}</div>}
      {!apiError && search && isLoading && <div>Loading ...</div>}
      {!apiError && search && !isLoading && (
        <div>
          {(seriesType) &&
            <div>
              <p>{symbol}</p>
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
          }
        </div>
      )}
    </Fragment>
  )
}

export default Standard
