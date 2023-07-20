import React from 'react'
import PropTypes from 'prop-types'
import ParticlesBg from 'particles-bg'
import { Outlet, Route, Routes } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import StcokFetcher from './Components/StockFetcher'
import ListPage from './Components/ListPage'
import ExpandableTable from './Components/ExpandableTable'
import NavBar from './Components/NavBar'
import Footer from './Components/shared/Footer'
import Main from './Main'

const useStyles = makeStyles((theme) => ({
  app: {
    position: 'relative',
    textAlign: 'center',
    // backgroundImage: 'url(./images/background.jpg)',
    // backgroundRepeat: 'no-repeat',
    minHeight: '92vh',
    fontSize: '12px',
    padding: '10px'
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  main: {
    display: 'flex',

    alignItems: 'center'
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    padding: '15px 0',
    minHeight: '50px',
    backgroundColor: '#ffd8d8'
    // padding: theme.spacing(6),
  }
}))

const Home = ({ classes }) => (
  <>
    <CssBaseline />
    <NavBar />
    <div className={classes.app}>
      <Main classes={classes} />
      <ParticlesBg type="circle" bg={true} />
      <Outlet />
    </div>
    <Footer classes={classes} />
  </>
)

Home.propTypes = {
  classes: PropTypes.object
}

const Album = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home classes={classes}></Home>} />
        <Route path="stocks" element={<StcokFetcher classes={classes} />} />
        <Route path="expand_table" element={<ExpandableTable classes={classes} />} />
        <Route path="filter_table" element={<ListPage classes={classes} />} />
      </Routes>
    </React.Fragment>
  )
}

export default Album
