import React, { ReactElement } from 'react'
import TextField from '@material-ui/core/TextField';

import SearchSVG from './SearchIcon'
import './search.css'

const capitalized = (word: string): string  => word.charAt(0).toUpperCase() + word.slice(1)

const Search = ({
  searchBy,
  searchText,
  handleSearch,
}: {
  searchBy: string
  searchText: string
  handleSearch: (text: string, type: string) => void
}): ReactElement => (
  <>
    <TextField
      fullWidth
      variant="standard"
      color="primary"
      className="searchBox"
      label={`${capitalized(searchBy)} Search`}
      placeholder={searchText}
      value={searchText || ""}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value, searchBy);
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
  </>
)

export default Search
