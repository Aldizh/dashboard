import React, { ReactElement } from 'react'
import TextField from '@material-ui/core/TextField';

import SearchSVG from './SearchIcon'
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
    <TextField
      fullWidth
      variant="standard"
      color="primary"
      label={`${searchBy} Search`}
      placeholder={searchText}
      value={searchText || ""}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
      }}
    />
    <SearchSVG
      style={{
        position: 'absolute',
        right: '5px',
        bottom: '15px',
        paddingRight: '4px',
        enableBackground: 'new 0 0 451 451'
      }}
      fill = '#000'
      width = '15px'
      height = '20px'
      className = ''
      viewBox = '0 0 40 26'
    />
  </div>
)

export default Search
