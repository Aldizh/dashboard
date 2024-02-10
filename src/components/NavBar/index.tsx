import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar } from "@mui/material"
import useTheme from "@mui/material/styles/useTheme"

import "./styles.css"

const NavBar = () => {
  const handleHomeClickResponsive = () => {
    const x: HTMLElement | null = document.getElementById("myTopnav")
    if (x && x.className === "topnav") {
      x.className += " responsive"
    } else {
      if (x) x.className = "topnav"
    }
  }

  useEffect(() => {
    const pages = ["/", "/stocks", "/filter_table", "/expand_table"]
    let curPage = document.URL
    curPage = curPage.substring(curPage.lastIndexOf("/"))
    const routeIndex = pages.indexOf(curPage)

    // Applies color based on current page
    const links = document.getElementById("myTopnav")?.children
    links && links[routeIndex] && links[routeIndex].classList.add("current-link")
  }, [])

  const theme = useTheme()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        alignItems: "center"
      }}
    >
      <Toolbar>
        <div className="topnav" id="myTopnav">
          <Link to="/">Home</Link>
          <Link to="/stocks">Stocks</Link>
          <Link to="/filter_table">Filter Table</Link>
          <Link to="/expand_table">Expand Table</Link>
          <a href={"#"} className="icon" onClick={handleHomeClickResponsive}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
