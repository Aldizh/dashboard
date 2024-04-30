import { useState } from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"

import { useListPageContext } from "../context"
import { getNewMembers } from "./utils"

const SectionList = (props: any) => {
  const { filterFacets, members, filterBy, isIchecked } = props

  const [state, setState] = useState({
    checked: [0]
  })
  const [{ chips }, dispatch] = useListPageContext()

  const toggleChips = (chip: {
    filterBy: string,
    filterText: string,
    code: string
  }) => {
    const newchips = chips
    const index = newchips.findIndex((item: {
      code: string
    }) => chip.code === item.code)
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

  const handleToggle = (item: {
    code: string,
    description: string
  }, filterBy: string) => () => {
    const { checked } = state
    const index = checked.indexOf(Number(item.code))
    const newChecked = [...checked]

    if (index === -1) {
      newChecked.push(Number(item.code))
    } else {
      newChecked.splice(index, 1)
    }

    setState({
      checked: newChecked
    })

    toggleChips({
      filterBy,
      filterText: item.description,
      code: item.code
    })
  }

  return (
    <List>
      {filterFacets.map((item: {
        code: string,
        description: string
      }) => (
        <ListItemButton
          key={`#${item.code}`}
          onClick={handleToggle(item, filterBy)}
        >
          <Checkbox
            checked={isIchecked(item.description)}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={`(${item.code}) ${item.description}`} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default SectionList