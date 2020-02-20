import {replace} from 'react-router-redux';
import { Store, Action } from 'redux';

export default (store: any) => (next: any) => (action: any) => {
  if (action.pushToUrl) {
    const state = store.getState();
    const typelessReplace = replace as any
    store.dispatch(typelessReplace({
      pathname: state.routing.locationBeforeTransitions.pathname,
      query: {
        ...state.routing.locationBeforeTransitions.query,
        ...action.pushToUrl
      }
    }));
  }

  return next(action);
}

const getProps = (url: string): Record<string, any> => {
  var result = {}
  const propsString = url.split('?')[1]
  if(propsString === undefined) return {}
  const props = propsString.split('&')
  for(let prop of props) {
    const [key, value] = prop.split('=')
    result = Object.assign({}, result, {[key]: value})
  }
  return result
}

export const getValueFromUrl = (prop: string, def: any, mapper?: (value: any) => any) => {
  const currentLocation = document.URL;
  const value = getProps(currentLocation)[prop]
  if(value === undefined) return def;
  else if(mapper === undefined) return value;
  else return mapper(value)
}
