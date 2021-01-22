import React from "react"
import "./search.css"
import SearchSVG from "./images/search"

type SearchTypes = {
  searchBy: string,
  searchText: String,
  handleSearch: () => void
}

const Search = ({ searchBy, searchText, handleSearch }: SearchTypes) => (
  <div className="searchBox">
    <input
      type="text"
      placeholder={`${searchBy} Search`}
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
    />
    <SearchSVG />
  </div>
)

export default Search