import React from 'react';
import Fetcher from './Fetcher'
import Table from './Table'
import ListPage from "./ListPage"
import NavBar from "./Components/NavBar"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact={true} path="/dashboard" render={() => (
          <React.Fragment>
            <NavBar />
            <div class="container">
              <div class="helper">
                <ul>
                  <li>
                    <Link to={'/dashboard/stocks'}>Stock Tracker</Link>
                  </li>
                  <li>
                    <Link to={'/dashboard/expand_table'}>Expandable Table</Link>
                  </li>
                  <li>
                    <Link to={'/dashboard/filter_table'}>Filterable Table</Link>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      />
      <Route path="/dashboard/stocks"
        render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <Fetcher />
          </React.Fragment>
        )}
      />
      <Route path="/dashboard/expand_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <Table />
          </React.Fragment>
        )}
      />
      <Route path="/dashboard/filter_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <ListPage />
          </React.Fragment>
        )}
      />
      </Router>
    </div>
  );
}

export default App;
