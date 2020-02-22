

export interface FlagFiltersState {
  [flagName: string]: boolean
}

export interface FiltersState {
  filtersShown: boolean,
  city: Location,
  helpType: HelpType,
  flags: FlagFiltersState
}

export interface AppState {
  filters: FiltersState
}

export enum HelpType {
  NONE = 'none', EMOTIONS = 'emotions', LAW = 'law'
}

export type Location = City | null

export interface City {
  id: number,
  name: string,
}

export interface HelpFilter {
  helpTypes: HelpType[],
  id: number,
  name: string,
  label: string,
  stateVar: string
}

export interface Institution {
  id: string,
  name: string,
  description: string
}
