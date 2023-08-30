import React from 'react'
import { Chip } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import type { Members, Chips } from '../../types/FilterTable'

// local imports
import { useListPageContext } from './context'
import './styles.css'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#00FFFF'
    }
  }
})

const getNewMembers = (chips: Chips, members: Members) => {
  if (!chips.length) return members
  const newMembers: Members | any[] = []

  const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

  chips.forEach((currChip) => {
    const memberByCode = members.find((member) => getKeyValue(currChip.filterBy)(member) === currChip.code)
    const memberByText = members.find((member) => getKeyValue(currChip.filterBy)(member) === currChip.filterText)
    const member = memberByCode || memberByText
    if (member) newMembers.push(member)
  })
  return newMembers
}

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
    dispatch({ type: 'update_chips', data: newchips })
    dispatch({
      type: 'update_members',
      data: getNewMembers(newchips, members)
    })
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="chipsWrapper">
          {chips.map((chip) => (
            <Chip
              key={chip.code}
              label={chip.filterText}
              onDelete={() => {
                toggleChips(chip)
              }}
              className={'memberChip'}
              color="secondary"
            />
          ))}
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Toolbar
