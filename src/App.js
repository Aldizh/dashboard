import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Paper } from '@material-ui/core';
import StcokFetcher from 'StockFetcher'
import Table from 'Components/ExpandableTable'
import ListPage from 'ListPage'
import NavBar from 'Components/NavBar'
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      height: theme.spacing(30),
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        <Route exact={true} path="/dashboard" render={() => (
          <React.Fragment>
            <NavBar />
            <div className={classes.root}>
              <div className="paper">
                <Paper elevation={0}>
                  <Link to={'/dashboard/stocks'}>Stock Tracker</Link>
                </Paper>
              </div>
              <div className="paper">
                <Paper>
                  <Link to={'/dashboard/expand_table'}>Expandable Table</Link>
                </Paper>
              </div>
              <div className="paper">
                <Paper elevation={3}>
                  <Link to={'/dashboard/filter_table'}>List Page</Link>
                </Paper>
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
            <StcokFetcher />
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
