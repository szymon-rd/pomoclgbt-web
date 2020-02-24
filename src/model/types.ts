

export interface FlagFiltersState {
  [flagName: string]: boolean
}

export interface FiltersState {
  filtersShown: boolean,
  city: Location,
  helpType: HelpType,
  flags: FlagFiltersState
}

export interface LayoutState {
  mobile: boolean
}

export interface AppState {
  filters: FiltersState
  layout: LayoutState,
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

export interface InstitutionContact {
  label: string,
  address: string,
  displayAddress: string
}

export interface Institution {
  id: string,
  name: string,
  label: string,
  description: string
  contact: InstitutionContact[]
}
