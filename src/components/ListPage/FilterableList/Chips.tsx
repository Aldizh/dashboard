import React from "react"
import { Chip } from "@mui/material"

// types
import type { Members, Chips } from "../../../types/FilterTable"

// local imports
import { getNewMembers } from "./utils"
import { useListPageContext } from "../context"
import "../styles.css"

const Toolbar = ({ members }: { members: Members }) => {
  const [data, dispatch] = useListPageContext()
  const { chips = [] }: { chips: Chips } = data

  const toggleChips = (chip: { code: string, filterText: string, filterBy: string}) => {
    const newchips = chips
    const index = newchips.findIndex((item) => chip.code === item.code)
    if (index === -1) {
      newchips.push(chip)
    } else {
      newchips.splice(index, 1)
    }
    dispatch({ type: "update_chips", data: newchips })
    dispatch({
      type: "update_members",
      data: getNewMembers(newchips, members)
    })
  }

  return (
    <React.Fragment>
      <div className="chipsWrapper">
        {chips.map((chip) => (
          <Chip
            key={chip.code}
            label={chip.filterText}
            onDelete={() => {
              toggleChips(chip)
            }}
            className={"memberChip"}
            color="secondary"
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Toolbar
