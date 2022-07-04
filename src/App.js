import React from 'react'
import ParticlesBg from 'particles-bg'
import { Outlet, Route, Routes } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import StcokFetcher from './components/StockFetcher'
import ListPage from './components/ListPage'
import Table from './components/ExpandableTable'
import NavBar from './components/NavBar'
import Main from './Main'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://aldizh.github.io/dashboard"
      >
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
    fontSize: '12px',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  main: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
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
    padding: '15px 0',
    minHeight: '50px',
    backgroundColor: '#ffd8d8',
    // padding: theme.spacing(6),
  },
}))

const Layout = ({ classes }) => (
  <>
    <CssBaseline />
    <NavBar />
    <div className={classes.app}>
      <ParticlesBg type="circle" bg={true} />
      <Outlet />
    </div>
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Thank you for visiting
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textPrimary"
        component="p"
      >
        Feel free to check out my&nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://aldizhupani.medium.com/"
        >
          medium
        </a>
        {' blog'}
      </Typography>
      <Copyright />
    </footer>
  </>
)

const Album = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout classes={classes}></Layout>}>
          <Route path="home" element={<Main classes={classes} />} />
          <Route path="stocks" element={<StcokFetcher />} />
          <Route path="expand_table" element={<Table />} />
          <Route path="filter_table" element={<ListPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default Album
