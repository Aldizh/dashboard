import React from 'react'
import { find, propEq } from 'ramda'
import { PropTypes } from 'prop-types'
import { Chip } from '@material-ui/core'
import { useListPageContext } from './context'
import './styles.css'

const getNewMembers = (chips, members) => {
  if (!chips.length) return members
  let newMembers = []
  chips.forEach((currChip) => {
    const member =
      find(propEq(currChip.filterBy, currChip.code), members) ||
      find(propEq(currChip.filterBy, currChip.filterText), members)
    if (member) newMembers.push(member)
  })
  return newMembers
}

const Toolbar = ({ members }) => {
  const [data, dispatch] = useListPageContext()
  const { chips = [] } = data

  const toggleChips = (chip) => {
    let newchips = chips
    const index = newchips.findIndex((item) => chip.code === item.code)
    if (index === -1) {
      newchips.push(chip)
    } else {
      newchips.splice(index, 1)
    }
    dispatch({ type: 'update_chips', data: newchips })
    dispatch({
      type: 'update_members',
      data: getNewMembers(newchips, members),
    })
  }

  return (
    <React.Fragment>
      <div>
        <div className="toolbar">
          <div className="wrapper">
            {chips.map((chip) => (
              <Chip
                key={chip.code}
                label={chip.filterText}
                onDelete={() => {
                  toggleChips(chip)
                }}
                className={'memberChip'}
                color="primary"
              />              
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Toolbar.propTypes = {
  data: PropTypes.array,
  toggleChips: PropTypes.func,
}

export default Toolbar
