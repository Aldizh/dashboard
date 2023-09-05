const ListReducer = (state, action) => {
  switch (action.type) {
    case "update_chips":
      return {
        ...state,
        chips: action.data
      }
    case "update_members":
      return {
        ...state,
        members: action.data
      }
    default:
      return state
  }
}

export default ListReducer
