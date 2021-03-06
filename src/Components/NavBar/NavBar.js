import React, { useEffect } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import './styles.css'

const NavBar = () => {
  const handleHomeClickResponsive = () => {
    var x = document.getElementById('myTopnav')
    if (x.className === 'topnav') {
      x.className += ' responsive'
    } else {
      x.className = 'topnav'
    }
  }

  useEffect(() => {
    const pages = ['/', '/stocks', '/filter_table', '/expand_table']
    var curPage = document.URL
    curPage = curPage.substr(curPage.lastIndexOf('/'))
    const routeIndex = pages.indexOf(curPage)
  
    // Applies color based on current page
    const links = document.getElementById('myTopnav').children
    links[routeIndex] && links[routeIndex].classList.add('current-link')
  }, [])

  return (
    <AppBar position="static" color="default" elevation={0} className="appBar">
      <Toolbar>
        <div className="topnav" id="myTopnav">
          <a href={'/dashboard'}>Dashboard</a>
          <a href={'/dashboard/stocks'}>Stock Symbol Tracker</a>
          <a href={'/dashboard/filter_table'}>List Page</a>
          <a href={'/dashboard/expand_table'}>Expandable Table</a>
          <a href={'#'} className="icon" onClick={handleHomeClickResponsive}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
