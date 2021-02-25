import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Route } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core';
import StcokFetcher from 'StockFetcher'
import Table from 'Components/ExpandableTable'
import ListPage from 'ListPage'
import NavBar from 'Components/NavBar'
import './App.css';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 250,
  },
  control: {
    padding: theme.spacing(2),
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Route exact={true} path="/" render={() => (
        <React.Fragment>
          <NavBar />
          <hr />
          <p className="titleDesc">React Projects</p>
          <Grid container justify="center" className={classes.root} spacing={3}>
            <Grid container justify="center" item xs={12} sm={4} lg={4}>
              <Paper className={classes.paper} elevation={0}>
                <Link to={'/stocks'}>Stock Tracker</Link>
              </Paper>
            </Grid>
            <Grid container justify="center" item xs={12} sm={4} lg={4}>
              <Paper className={classes.paper}>
                <Link to={'/expand_table'}>Expandable Table</Link>
              </Paper>
            </Grid>
            <Grid container justify="center" item xs={12} sm={4} lg={4}>
              <Paper className={classes.paper}>
              <Link to={'/filter_table'}>List Page</Link>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
        )}
      />
      <Route exact path="/stocks"
        render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <StcokFetcher />
          </React.Fragment>
        )}
      />
      <Route exact path="/expand_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <Table />
          </React.Fragment>
        )}
      />
      <Route exact path="/filter_table" render={() => (
          <React.Fragment>
            <NavBar />
            <hr />
            <ListPage />
          </React.Fragment>
        )}
      />
    </div>
  );
}

export default App;
