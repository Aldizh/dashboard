import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

const defaultState = {
  data: {
    'Meta Data': {
      "1. Information": "Intraday (15min) open, high, low, close prices and volume",
      "2. Symbol": "SPY",
      "3. Last Refreshed": "2021-12-02 20:00:00",
      "4. Interval": "15min",
      "5. Output Size": "Full size",
      "6. Time Zone": "US/Eastern"
    },
    'Time Series (15min)': {
      "2021-10-22 04:15:00": {
        "1. open": 70.1025,
        "2. high": 73.1825,
        "3. low": 69.1825,
        "4. close": 71.0543,
        "5. volume": 101
      }
    }
  }
}

// TO DO: This hooks needs to rely less on initial data so that 
// we can swap it for a different data source in the future
const useDataApi = (symbol, seriesType, initialUrl, initialData = defaultState) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(url)
        
        // This means we hit the daily threshold of 5 calls per minute
        if (result.data.Note) dispatch({ type: 'FETCH_FAILURE' })
        
        if (seriesType === "TIME_SERIES_INTRADAY_EXTENDED") {
          // Parse csv result here
          const extendedData = result.data.split("\r\n")
          const rows = extendedData.slice(1)
          let extendedByDate = {}

          // iterate through these
          rows.forEach((row) => {
            const time = row.substring(0, 19)
            const rowData = row.substring(20)
            const dataPoints = rowData.split(",")
            if (rowData) extendedByDate[time] = {
              "1. open": dataPoints[0],
              "2. high": dataPoints[1],
              "3. low":  dataPoints[2],
              "4. close": dataPoints[3],
              "5. volume": dataPoints[4]
            }
          })
          dispatch({ type: 'FETCH_SUCCESS', payload: {
            data: {
              'Meta Data': { 
                "1. Information": "Intraday (15min) open, high, low, close prices and volume",
                "2. Symbol": symbol,
                "3. Last Refreshed": "2021-12-02 20:00:00",
                "4. Interval": "15min",
                "5. Output Size": "Full size",
                "6. Time Zone": "US/Eastern"
               },
              'Time Series (15min)': extendedByDate
            }
          } })
        }

        else {
          dispatch({ type: 'FETCH_SUCCESS', payload: result })
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }

    if (symbol) fetchData()
  }, [symbol, seriesType, url])

  const updateUrl = (url) => setUrl(url)

  return { ...state, updateUrl }
}

export default useDataApi
