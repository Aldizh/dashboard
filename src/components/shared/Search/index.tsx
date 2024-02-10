import React, { ReactElement } from "react"
import TextField from "@mui/material/TextField";

import SearchSVG from "./SearchIcon"
import { FilterType } from "../../../types/FilterTable"

const capitalized = (word: string): string  => word.charAt(0).toUpperCase() + word.slice(1)

const Search = ({
  searchBy,
  searchText,
  handleSearch,
}: {
  searchBy: FilterType
  searchText: string
  handleSearch: (text: string, type: FilterType) => void
}): ReactElement => (
  <div style={{display: "flex"}}>
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
        position: "relative",
        top: "12px",
        enableBackground: "new 0 0 451 451"
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
