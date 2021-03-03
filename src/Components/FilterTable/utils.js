export const formatDate = (dateVal) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateVal).toLocaleDateString('en-US', options)
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const stableSort = (array, order, orderBy) => {
  const comparator = getComparator(order, orderBy)
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0])
    if (newOrder !== 0) return newOrder
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
