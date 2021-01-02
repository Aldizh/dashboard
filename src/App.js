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
            <ul>
              <li>
                <Link to={'/dashboard/books'}>Book Fetcher Api</Link>
              </li>
              <li>
                <Link to={'/dashboard/expand_table'}>Expandable Table</Link>
              </li>
              <li>
                <Link to={'/dashboard/filter_table'}>Filterable Table</Link>
              </li>
            </ul>
          </React.Fragment>
        )} />
        <Route path="/dashboard/books" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <Fetcher />
          </React.Fragment>
        )} />
        <Route path="/dashboard/expand_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <Table />
          </React.Fragment>
        )} />
        <Route path="/dashboard/filter_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <ListPage />
          </React.Fragment>
        )} />
      </Router>
    </div>
  );
}

export default App;
