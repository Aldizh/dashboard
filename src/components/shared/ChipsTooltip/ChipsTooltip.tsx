import { ReactElement } from "react"
import { Tooltip, IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"

const ToolTip = ({
  numSelected,
  deleteMembers,
}: {
  numSelected: number
  deleteMembers: () => void
}): ReactElement => {
  return numSelected > 0 ? (
    <Tooltip title="Delete">
      <IconButton aria-label="delete" onClick={deleteMembers}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Filter list">
      <IconButton aria-label="filter list">
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  )
}

export default ToolTip
