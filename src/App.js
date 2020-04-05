import React from 'react';
import Fetcher from './dataFetcher'
import Table from './Table'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact={true} path="/" render={() => (
            <div className="AppLinks">
              <span className="linkSpan">
                <Link to={'/books'}>Book Fetcher App</Link>
              </span>
              <span className="linkSpan">
                <Link to={'/table'}>Expandable Table</Link>
              </span>
              <span className="linkSpan">
                <Link to={'https://reactjs.org'} target="_blank">React Docs</Link>
              </span>
            </div>
          )} />
          <Route path="/books" render={() => (
              <React.Fragment>
                <Link to={'/'}>
                  Home
                </Link>
                <Fetcher />
              </React.Fragment>
          )} />
          <Route path="/table" render={() => (
              <React.Fragment>
                <div className="homeNav">
                  <Link to={'/'}>
                    Home
                  </Link>
                </div>
                <Table />
              </React.Fragment>
          )} />
        </Router>
      </header>
    </div>
  );
}

export default App;
