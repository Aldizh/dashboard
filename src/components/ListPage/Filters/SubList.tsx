import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { useListPageContext } from '../context'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper
  }
})

// Update membership data by looking at chips
const calcuateFilteredData = (chips: Array<{
  filterBy: string,
  filterText: string,
  code: string
}>, members: Array<any> = []) => {
  if (!chips.length) return members // no filters, return everything

  return members.filter((member) => {
    const countryChips = chips.filter((currChip) => currChip.filterBy === "country")
    const currencyChips = chips.filter((currChip) => currChip.filterBy === "currency")
    const membershipChips = chips.filter((currChip) => currChip.filterBy === "membership_type")

    const countryCodes = countryChips.map(chip => chip.code)
    const currencyCodes = currencyChips.map(chip => chip.code)
    const memberShipCodes = membershipChips.map(chip => chip.filterText)

    // * if the the selection within a group is present then consider all chips for that category
    return (
      (
        !countryCodes.length ||
        countryCodes.includes(member["country"])
      ) &&
      (
        !currencyCodes.length ||
        currencyCodes.includes(member["currency"])
      ) &&  (
        !memberShipCodes.length ||
        memberShipCodes.includes(member["membership_type"])
      )
    )
  })
}

const SectionList = (props: any) => {
  const { classes, filterFacets, members, filterBy, isIchecked } = props

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
    dispatch({ type: 'update_chips', data: newchips })
    dispatch({
      type: 'update_members',
      data: calcuateFilteredData(newchips, members)
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
    <List className={classes.root}>
      {filterFacets.map((item: {
        code: string,
        description: string
      }) => (
        <ListItem
          key={`#${item.code}`}
          dense
          button
          onClick={handleToggle(item, filterBy)}
        >
          <Checkbox
            checked={isIchecked(item.description)}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={`(${item.code}) ${item.description}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(SectionList)