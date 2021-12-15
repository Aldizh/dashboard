import React from 'react'
import { Link, Route } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import StcokFetcher from './StockFetcher'
import ListPage from './ListPage'
import Table from './Components/ExpandableTable'
import NavBar from './Components/NavBar'

import './App.css'
import chart from './images/chart.jpg'
import listImg from './images/list_table.png'
import expandImg from './images/expand_table.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a target="_blank" href="https://aldizh.github.io/dashboard">
        Dashboard&nbsp;
      </a>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  app: {
    position: 'relative',
    textAlign: 'center',
    // backgroundImage: 'url(./images/background.jpg)',
    // backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    fontSize: 'calc(10px + 2vmin)'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6),
  },
}))

const Album = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.app}>
        <Route
          exact={true}
          path="/"
          render={() => (
            <>
              <NavBar />
              <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                    <Typography
                      variant="h4"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      Sample React Projects
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="textPrimary"
                      paragraph
                    >
                      These are just a few projects to showcase the
                      versatility of react when it comes to building slick and
                      efficient UI components.
                    </Typography>
                    {/* <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button variant="outlined" color="primary">
                          <Link to={'/'}>Profile</Link>
                        </Button>
                      </Grid>
                    </Grid>
                  </div> */}
                  </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                    <Grid item key={1} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={expandImg}
                          title="Expandable Table"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Expandable Table
                          </Typography>
                          <Typography>
                            Nice exapndable table to show more row specific
                            info.
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                          <Button size="small" color="primary">
                            <Link to={'/expand_table'}>View</Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item key={2} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={chart}
                          title="Chart"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Stock Tracker
                          </Typography>
                          <Typography>
                            Compare any ticker symbol against the S&P benchmark
                            to get stock&apos performance.
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                          <Button size="small" color="primary">
                            <Link to={'/stocks'}>View</Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item key={3} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={listImg}
                          title="Filterable Table"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Filterable List
                          </Typography>
                          <Typography>
                            List page with filter and pagination capabilities
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                          <Button size="small" color="primary">
                            <Link to={'/filter_table'}>View</Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                </Container>
              {props.children}
              </main>
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                  Thank you for visiting
                </Typography>
                <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
                  Feel free to check out my&nbsp;
                  <a target="_blank" href="https://aldizhupani.medium.com/">medium</a>{' blog'}
                </Typography>
                <Copyright />
              </footer>
              {/* End footer */}
            </>
          )}
        />
        <Route
          exact
          path="/stocks"
          render={() => (
            <React.Fragment>
              <NavBar />
              <main>
                <div className={classes.heroContent}>
                  <StcokFetcher />
                  {props.children}
                </div>
              </main>
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/expand_table"
          render={() => (
            <React.Fragment>
              <NavBar />
              <main>
                <div className={classes.heroContent}>
                  <Table />
                  {props.children}
                </div>
              </main>
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/filter_table"
          render={() => (
            <React.Fragment>
              <NavBar />
              <main>
                <div className={classes.heroContent}>
                  <ListPage />
                  {props.children}
                </div>
              </main>
            </React.Fragment>
          )}
        />
      </div>
    </React.Fragment>
  )
}


export default Album