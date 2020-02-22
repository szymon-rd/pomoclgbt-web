import { Location, HelpType, FlagFiltersState } from './types'

export type ActionType = "SET_LOCATION" | "SET_HELP_TYPE" | "SET_FILTERS_SHOWN" | "SET_FILTER_FLAGS"

export interface Action {
  type: ActionType,
  payload: any
}

export const setLocation = (location: Location): Action => ({
  type: "SET_LOCATION",
  payload: location
})

export const setType = (type: HelpType): Action => ({
  type: "SET_HELP_TYPE",
  payload: type
})

export const setFiltersShown = (shown: Boolean): Action => ({
  type: "SET_FILTERS_SHOWN",
  payload: shown
})

export const setFilterFlags = (flags: FlagFiltersState): Action => ({
  type: "SET_FILTER_FLAGS",
  payload: flags
})
