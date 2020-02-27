import { Location, HelpType, FlagFiltersState } from './types'

export type ActionType =
  "SET_LOCATION" | "SET_HELP_TYPE" | "SET_FILTERS_SHOWN" | "SET_FILTER_FLAGS" | "SET_MOBILE" | "SET_PAGE"

export type UrlKey = string

export interface UrlUpdater {
  param: string,
  payloadMapper?: (payload: any) => any
}

export interface Action {
  type: ActionType,
  payload: any,
  urlUpdaters?: UrlUpdater[]
}

export const setLocation = (location: Location): Action => ({
  type: "SET_LOCATION",
  payload: location,
  urlUpdaters: [{
    param: 'city',
    payloadMapper: city => city?.id
  }]
})

export const setType = (type: HelpType): Action => ({
  type: "SET_HELP_TYPE",
  payload: type,
  urlUpdaters: [{
    param: 'type'
  }]
})

export const setFiltersShown = (shown: Boolean): Action => ({
  type: "SET_FILTERS_SHOWN",
  payload: shown
})

export const setFilterFlags = (flags: FlagFiltersState): Action => ({
  type: "SET_FILTER_FLAGS",
  payload: flags,
  urlUpdaters: [
    {
      param: 'psy',
      payloadMapper: filters => filters.psychiatrist
    },
    {
      param: 'th',
      payloadMapper: filters => filters.therapist
    },
    {
      param: 'ins',
      payloadMapper: filters => filters.instantHelp
    },
    {
      param: 'org',
      payloadMapper: filters => filters.organization
    },
    {
      param: 'help',
      payloadMapper: filters => filters.lawHelp
    },
    {
      param: 'law',
      payloadMapper: filters => filters.lawyer
    }
  ]
})

export const setMobile = (mobile: boolean): Action => ({
  type: 'SET_MOBILE',
  payload: mobile
})

export const setPage = (page: number): Action => ({
  type: 'SET_PAGE',
  payload: page,
  urlUpdaters: [{
    param: 'page'
  }]
})
