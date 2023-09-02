export const formatDate = (dateVal: string): string => {
  const options: Record<string, string> = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return new Date(dateVal).toLocaleDateString('en-US', options)
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
  order === 'desc'
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
