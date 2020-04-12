import React from "react"
import "./search.css"
import SearchSVG from "./images/search"

const search = (props) => (
  <div className="searchBox">
    <SearchSVG />
    <input
      type="text"
      placeholder="Search"
      value={props.searchText}
      onChange={(e) => props.handleSearch(e.target.value)}
    />
  </div>
)

export default search