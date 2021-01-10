// Documentation for canvas js: https://canvasjs.com/docs
// Documentationf for alpha advantage: https://www.alphavantage.co/documentation/

import React, { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";
import Canvas from "./Canvas"

const initialData = { data: { "Meta Data": { 'symbol': 'C'}, "Time Series (Daily)": {} }}
const APLHA_API_KEY = '1PXX8A1J2QJQFTBP'
const STOCK_SYMBOL = 'C'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { ...state, doFetch };
};

function App() {
  const [symbol, setSymbol] = useState(STOCK_SYMBOL);

  const { data: { data }, isLoading, isError, doFetch } = useDataApi(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=Daily&apikey=${APLHA_API_KEY}`
  );

  useEffect(() => {
    doFetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=Daily&apikey=${APLHA_API_KEY}`);
  }, [symbol, doFetch])

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=Daily&apikey=${APLHA_API_KEY}`);
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

export default App;
