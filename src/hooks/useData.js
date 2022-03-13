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

// TO DO: Abstract enough so can swap it for a different data source in the future
const useDataApi = (search, initialUrl) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: defaultState,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(url)
  
        // This means we hit the daily threshold of 5 calls per minute
        if (result.data.Note) dispatch({ type: 'FETCH_FAILURE' })
        
        dispatch({ type: 'FETCH_SUCCESS', payload: result })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }

    if (search) fetchData()
  }, [url])

  const updateUrl = (url) => setUrl(url)

  return { ...state, updateUrl }
}

export default useDataApi
