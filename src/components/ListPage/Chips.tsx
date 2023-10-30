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

  // TO DO: Chips within the same category should be AND instead of OR
const getNewMembers = (chips: Chips, members: Members) => {
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
