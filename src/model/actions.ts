import { Location, HelpType } from './types'

export type ActionType = "SET_LOCATION" | "SET_HELP_TYPE" | "SET_FILTERS_SHOWN"

export interface Action {
  type: ActionType,
  payload: any
}

export const setLocation = (location: Location) => ({
  type: "SET_LOCATION",
  payload: location
})

export const setType = (type: HelpType) => ({
  type: "SET_HELP_TYPE",
  payload: type
})

export const setFiltersShown = (shown: Boolean) => ({
  type: "SET_FILTERS_SHOWN",
  payload: shown
})
