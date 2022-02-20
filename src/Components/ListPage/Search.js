import React from 'react'
import PropTypes from 'prop-types'
import './search.css'
import SearchSVG from './images/search'

const Search = ({ searchBy, searchText, handleSearch }) => (
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

Search.propTypes = {
  searchBy: PropTypes.string,
  searchText: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default Search
