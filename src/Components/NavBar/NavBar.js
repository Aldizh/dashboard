import React, { useState, useEffect } from 'react';
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
      <a href="/dashboard">Home</a>
      <a href="/filter_table">Filterable Table</a>
      <a href="/expand_table">Expandable Table</a>
    </div>
  );
}

export default NavBar;