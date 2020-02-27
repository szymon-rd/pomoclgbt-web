import { createStore, combineReducers, Middleware, MiddlewareAPI, Dispatch, applyMiddleware, compose } from 'redux'
import { AppState, HelpType, FiltersState, LayoutState } from './types'
import { idToCity } from './constants'
import { Action } from './actions'
import { Action as ReduxAction } from 'redux'
import { getValueFromUrl, updateUrl } from './urlUpdater'

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
  search: getValueFromUrl('search', ''),
  page: getValueFromUrl('page', 0)
}

const layoutState: LayoutState = {
  mobile: false
}


export const urlMiddleware: Middleware =
  (api: MiddlewareAPI) =>
  (next: Dispatch<ReduxAction>) =>
  (action: ReduxAction & {action: Action}): ReduxAction => {
  const result = next(action);
  updateUrl(action.action)
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
    case "SET_PAGE":
      return Object.assign({}, state, {
        page: action.payload
      })
    default:
      return state;
  }
}

const layoutReducer = (state: LayoutState = layoutState, action: Action) => {
  switch(action.type) {
    case "SET_MOBILE":
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
