// Global state for announcement dialog
import React, { createContext, useContext, useReducer } from 'react'
import listPageContext from './reducer'

export const StateContext = createContext()

export const StateProvider = ({ initialState, children }) => (
  <StateContext.Provider value={useReducer(listPageContext, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useListPageContext = () => useContext(StateContext) // This is to avoid duplication on the consumer side
