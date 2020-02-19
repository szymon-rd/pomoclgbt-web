import { createStore } from 'redux'
import { Action, AppState, HelpType } from './types'

const initialState: AppState = {
  city: null,
  helpType: HelpType.NONE
}

const appStore = (state: AppState = initialState, action: Action) => {
  return state;
}

export const store = createStore(appStore)
