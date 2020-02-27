import { createStore, combineReducers, Middleware, MiddlewareAPI, Dispatch, applyMiddleware, compose } from 'redux'
import { AppState, HelpType, FiltersState, LayoutState } from './types'
import { idToCity } from './constants'
import { Action } from './actions'
import { getValueFromUrl } from './urlUpdater'

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
  },
  search: getValueFromUrl('search', '')
}

const layoutState: LayoutState = {
  mobile: false
}

const appendToUrl = (url: string, key: string, value: string): string => {
  return url + `${url.length > 0 ? '&' : ''}${key}=${value}`
}

const updateUrl = (state: FiltersState) => { //consider making more general way
  // var url = ""
  // if(state.city) url = appendToUrl(url, 'city', state.city.id.toString())
  // if(state.helpType) url = appendToUrl(url, 'type', state.helpType)
  // if(state.search) url = appendToUrl(url, 'search', state.search)
  // if(state.flags.psychiatrist) url = appendToUrl(url, 'psy', '' + state.flags.psychiatrist)
  // if(state.flags.therapist) url = appendToUrl(url, 'th', '' + state.flags.psychiatrist)
  // if(state.flags.instantHelp) url = appendToUrl(url, 'ins', '' + state.flags.psychiatrist)
  // if(state.flags.organization) url = appendToUrl(url, 'org', '' + state.flags.psychiatrist)
  // if(state.flags.lawHelp) url = appendToUrl(url, 'help', '' + state.flags.psychiatrist)
  // if(state.flags.lawyer) url = appendToUrl(url, 'law', '' + state.flags.psychiatrist)
  // console.log(url)
  // document.location.assign(url);
}


export const urlMiddleware: Middleware =
  (api: MiddlewareAPI) =>
  (next: Dispatch<Action>) =>
  (action: Action): Action => {
    console.log(api.getState())
  console.log('axbc')
  const result = next(action);
  const state = api.getState() as AppState;
  updateUrl(state.filters)
  return result;
};

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

const layoutReducer = (state: LayoutState = layoutState, action: Action) => {
  switch(action.type) {
    case "SET_MOBILE":
      console.log(JSON.stringify(action))
      return Object.assign({}, state, {
        mobile: action.payload
      })
    default:
      return state;
  }
}

export const appStore = combineReducers({
  filters: filtersReducer,
  layout: layoutReducer
})

const middleware = applyMiddleware(urlMiddleware)

export const store = createStore(
  appStore,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware,
  )
  : middleware
)
