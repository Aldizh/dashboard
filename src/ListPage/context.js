// Global state for announcement dialog
import React, { createContext, useContext, useReducer } from 'react'

const listPageContext = (state, action) => {
  switch (action.type) {
    case 'update_chips':
      return {
        ...state,
        chips: action.data,
      }
    case 'update_members':
      return {
        ...state,
        members: action.data,
      }
    default:
      return state
  }
}

export const StateContext = createContext()

export const StateProvider = ({ initialState, children }) => (
  <StateContext.Provider value={useReducer(listPageContext, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useListPageContext = () => useContext(StateContext) // This is to avoid duplication on the consumer side
