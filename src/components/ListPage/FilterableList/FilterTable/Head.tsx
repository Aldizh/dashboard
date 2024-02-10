import PropTypes from "prop-types"
import {
  TableSortLabel,
  TableHead,
  TableRow,
  TableCell,
  Checkbox
} from "@mui/material"

import { headCells } from "./config"

function Head (props: {
  onSelectAllClick: (event: any) => void,
  order: string,
  orderBy: string,
  numSelected: number,
  rowCount: number,
  onRequestSort: (event: any, property: string) => void
}) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const sortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property)
  }
  // typescript is stubborn about SortDirection => string conversion
  let orderByDirection: "asc"| "desc" = "asc"
  if (order === "desc") orderByDirection = "desc"

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? orderByDirection : "desc"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? orderByDirection : "asc"}
              onClick={sortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                <span style={{
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    height: 1,
                    margin: -1,
                    overflow: "hidden",
                    position: "absolute",
                    top: 20,
                    width: 1
                }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

Head.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default Head
