import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { lighten, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"

import EnhancedTableHead from "./Head"
import ChipsTooltip from "../../../shared/ChipsTooltip"
import type { Members } from "../../../../types/FilterTable"

import { formatDate, stableSort } from "../utils"
import { formatCurrency } from "../../../../utils/string"
import { useListPageContext } from "../../context" // TO DO: Make this generic

const useToolbarStyles = makeStyles((theme) => ({
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}))

const EnhancedTableToolbar = (props: {
  selected: string[],
  rows: Members,
  setSelected: (arg: string[] | []) => void,
  dispatch: (arg: { type: string, data: Members }) => void
}) => {
  const classes = useToolbarStyles()
  const { rows, selected, setSelected, dispatch } = props
  const numSelected = selected.length

  const deleteMembers = () => {
    let updated = rows
    selected.forEach((member) => {
      updated = updated.filter((row) => member !== row.name)
    })
    setSelected([])
    dispatch({ type: "update_members", data: updated })
  }

  return (
    <Toolbar
      className={clsx({ [classes.highlight]: numSelected > 0 })}
      disableGutters={true}
    >
      {numSelected > 0
        ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
          )
        : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Memberships
        </Typography>
      )}

      <ChipsTooltip numSelected={numSelected} deleteMembers={deleteMembers} />
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.array.isRequired,
  dispatch: () => {}
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  paper: {
    width: "100%",
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    position: "absolute",
    top: 20,
    width: 1
  }
}))

export default function EnhancedTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [data, dispatch] = useListPageContext()
  const rows = data.members

  const handleRequestSort = (_event: Event, property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: Event) => {
    const target = event.target as HTMLInputElement; // Type assertion
    if (target.type === "checkbox" && target.checked) {
      const newSelected = rows.map((row: {
        name: string
      }) => row.name)
      setSelected(newSelected)
    } else setSelected([])
  }

  const handleClick = (event: any, name: never) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: never) => selected.includes(name)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          rows={rows}
          selected={selected}
          setSelected={setSelected}
          dispatch={dispatch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, order, orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: {
                  name: never,
                  membership_type: string,
                  country: string,
                  currency: string,
                  annual_fee: number,
                  from_date: string,
                  to_date: string
                }, index: number) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.membership_type}
                      </TableCell>
                      <TableCell align="center">{row.country}</TableCell>
                      <TableCell align="center">{row.currency}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.annual_fee)}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.from_date)}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.to_date)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}