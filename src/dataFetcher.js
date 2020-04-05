import React, { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";

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
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
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
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
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
  const [query, setQuery] = useState("isbn:0747532699");
  const { data, isLoading, isError, doFetch } = useDataApi(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    { items: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.items.map(item => (
            <li key={item.id}>
              <a href={item.selfLink} target="_blank" rel="noopener noreferrer">{item.volumeInfo.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
