import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import './styles.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffd8d8'
    }
  }
})

const NavBar = () => {
  const handleHomeClickResponsive = () => {
    const x: HTMLElement | null = document.getElementById('myTopnav')
    if (x && x.className === 'topnav') {
      x.className += ' responsive'
    } else {
      if (x) x.className = 'topnav'
    }
  }

  useEffect(() => {
    const pages = ['/', '/stocks', '/filter_table', '/expand_table']
    let curPage = document.URL
    curPage = curPage.substring(curPage.lastIndexOf('/'))
    const routeIndex = pages.indexOf(curPage)

    // Applies color based on current page
    const links = document.getElementById('myTopnav').children
    links[routeIndex] && links[routeIndex].classList.add('current-link')
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <div className="topnav" id="myTopnav">
            <Link to="/stocks">Stocks</Link>
            <Link to="/filter_table">Filter Table</Link>
            <Link to="/expand_table">Expand Table</Link>
            <a href={'#'} className="icon" onClick={handleHomeClickResponsive}>
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default NavBar
