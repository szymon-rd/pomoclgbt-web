import { createStore, combineReducers } from 'redux'
import { AppState, HelpType, FiltersState, idToCity } from './types'
import { Action } from './actions'
import { getValueFromUrl } from './urlparams'

const filtersState: FiltersState = {
  filtersShown: false,
  city: getValueFromUrl('city', null, idToCity),
  helpType: getValueFromUrl('type', null),
  flags: {
    psychiatrist: getValueFromUrl('psy', false, Boolean),
    therapist: getValueFromUrl('th', false, Boolean),
    instantHelp: getValueFromUrl('ins', false, Boolean),
    organization: getValueFromUrl('org', false, Boolean),
    lawHelp: getValueFromUrl('help', false, Boolean),
    lawyer: getValueFromUrl('law', false, Boolean)
  }
}

const filtersReducer = (state: FiltersState = filtersState, action: Action) => {
  console.log('abc')
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
