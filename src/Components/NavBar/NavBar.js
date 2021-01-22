import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './styles.css'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {

    var curPage = document.URL;
    curPage = curPage.substr(curPage.lastIndexOf("/"))

    // TO DO: Apply color based on current page
    // const currentLinks = document.getElementsByClassName('topnav a')
    // currentLinks.forEach((link) => {
    //     link.className += ' current-link'
    // })
  }, [])

  return (
    <div className="topnav">
      <Link to={'/dashboard'}>Home</Link>
      <Link to={'/dashboard/stocks'}>Stock Symbol Tracker</Link>
      <Link to={'/dashboard/filter_table'}>Filterable Table</Link>
      <Link to={'/dashboard/expand_table'}>Expandable Table</Link>
    </div>
  );
}

export default NavBar;
