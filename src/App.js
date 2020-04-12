import React from 'react';
import Fetcher from './Fetcher'
import Table from './Table'
import ListPage from "./ListPage"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact={true} path="/dashboard" render={() => (
            <React.Fragment>
              <ul>
                <li>
                  <Link to={'/books'}>Book Fetcher Api</Link>
                </li>
                <li>
                  <Link to={'/table'}>Expandable Table</Link>
                </li>
                <li>
                  <Link to={'/list_page'}>Filterable Table</Link>
                </li>
              </ul>
              <hr />
            </React.Fragment>
          )} />
          <Route path="/books" render={() => (
              <React.Fragment>
                <Link to={'/dashboard'}>
                  Home
                </Link>
                <Fetcher />
              </React.Fragment>
          )} />
          <Route path="/table" render={() => (
              <React.Fragment>
                <div className="homeNav">
                  <Link to={'/dashboard'}>
                    Home
                  </Link>
                </div>
                <Table />
              </React.Fragment>
          )} />
          <Route path="/list_page" render={() => (
              <React.Fragment>
                <div className="homeNav">
                  <Link to={'/dashboard'}>
                    Home
                  </Link>
                </div>
                <ListPage />
              </React.Fragment>
          )} />
        </Router>
      </header>
    </div>
  );
}

export default App;
