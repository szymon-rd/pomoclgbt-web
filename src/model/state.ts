import { createStore, combineReducers } from 'redux'
import { AppState, HelpType, FiltersState } from './types'
import { idToCity } from './constants'
import { Action } from './actions'
import { getValueFromUrl } from './urlparams'

const validateHelpType = (helpType: string) => {
  if(Object.values(HelpType).includes(helpType as HelpType)) return helpType;
  else return HelpType.NONE
}

const stringToBool = (s: string) => s === 'true'

const filtersState: FiltersState = {
  filtersShown: false,
  city: getValueFromUrl('city', null, idToCity),
  helpType: getValueFromUrl('type', HelpType.NONE, validateHelpType),
  flags: {
    psychiatrist: getValueFromUrl('psy', false, stringToBool),
    therapist: getValueFromUrl('th', false, stringToBool),
    instantHelp: getValueFromUrl('ins', false, stringToBool),
    organization: getValueFromUrl('org', false, stringToBool),
    lawHelp: getValueFromUrl('help', false, stringToBool),
    lawyer: getValueFromUrl('law', false, stringToBool)
  }
}

const filtersReducer = (state: FiltersState = filtersState, action: Action) => {
  switch(action.type) {
    case "SET_LOCATION":
      return Object.assign({}, state, {
        city: action.payload
      })
    case "SET_HELP_TYPE":
      return Object.assign({}, state, {
        helpType: action.payload
      })
    case "SET_FILTERS_SHOWN":
        return Object.assign({}, state, {
          filtersShown: action.payload
        })
    case "SET_FILTER_FLAGS":
        return Object.assign({}, state, {
          flags: action.payload
        })
    default:
      return state;
  }
}

export const appStore = combineReducers({
  filters: filtersReducer,
})

export const store = createStore(
  appStore,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => console.log("CHANGE!"))
