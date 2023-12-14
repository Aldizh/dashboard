import type { Members, Chips } from "../../../types/FilterTable"

export const formatDate = (dateVal: string): string => {
  const options: Record<string, string> = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }

  return new Date(dateVal).toLocaleDateString("en-US", options)
}

const descendingComparator = (a: Record<string, string>, b: Record<string, string>, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order :string, orderBy: string) =>
  order === "desc"
    ? (a: Record<string, string>, b: Record<string, string>) => descendingComparator(a, b, orderBy)
    : (a: Record<string, string>, b: Record<string, string>) => -descendingComparator(a, b, orderBy)

export const stableSort = (array: any[], order: string, orderBy: string) => {
  const comparator = getComparator(order, orderBy)
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0])
    if (newOrder !== 0) return newOrder
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export const getNewMembers = (chips: Chips, members: Members) => {
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
