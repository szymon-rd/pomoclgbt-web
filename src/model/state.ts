import { createStore } from 'redux'

const appStore = (state = "", action) => {
  return state;
}

export const store = createStore(appStore)
