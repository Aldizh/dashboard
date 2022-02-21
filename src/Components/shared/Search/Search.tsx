import React, { ReactElement } from 'react'

import SearchSVG from './searchIcon'
import './search.css'

const Search = ({
  searchBy,
  searchText,
  handleSearch,
}: {
  searchBy: string
  searchText: string
  handleSearch: (e: string) => void
}): ReactElement => (
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
