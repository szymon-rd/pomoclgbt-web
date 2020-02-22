import { createSelector } from 'reselect'
import { AppState } from './types'
import {HelpFiltersForType} from './constants'

export const getHelpType = (state: AppState) => state.filters.helpType

export const getHelpFilters = createSelector(
  [ getHelpType ],
  (helpType) => HelpFiltersForType[helpType]
)
