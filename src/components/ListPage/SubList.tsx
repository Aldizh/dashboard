import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { useListPageContext } from './context'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

// Update membership data by looking at chips
const calcuateFilteredData = (chips: Array<{
  filterBy: string,
  filterText: string,
  code: string
}>, members: Array<any> = []) => {
  if (!chips.length) return members
  return members.filter((member) =>
    chips.every(
      (currChip) =>
        member[currChip.filterBy] === currChip.code ||
        member[currChip.filterBy] === currChip.filterText
    )
  )
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

SectionList.propTypes = {
  classes: PropTypes.object.isRequired,
  filterFacets: PropTypes.array,
  searchText: PropTypes.string,
  filterBy: PropTypes.string,
  toggleChips: PropTypes.func,
  isIchecked: PropTypes.func
}

export default withStyles(styles)(SectionList)
// <List style={Object.assign({}, Style.SectionList)}>
//   {props.filterFacets.map((item, index) => {
//     if (
//       item.description
//         .toLowerCase()
//         .indexOf(props.searchText.toLowerCase()) !== -1
//     ) {
//       return (
//         <ListItem
//           style={{ fontSize: 12 }}
//           key={index}
//           leftCheckbox={
//             <Checkbox
//               onCheck={event => {
//                 props.toggleChips(
//                   item.code,
//                   item.description,
//                   props.filterBy
//                 );
//               }}
//               defaultChecked={props.isIchecked(item.description)}
//             />
//           }
//           primaryText={item}
//         />
//       );
//     } else {
//       return <div>{item}</div>;
//     }
//   })}
// </List>
