import { UrlUpdater, Action } from './actions'

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

export const updateUrl = (action: Action) => {
  console.log(action)
  const url: URL = new URL(document.location.href)
  if(action.urlUpdaters == undefined || action.urlUpdaters == null) return;
  const payload = action.payload;
  action.urlUpdaters.forEach(updater => {
    const value = updater.payloadMapper ? updater.payloadMapper(payload) : payload;
    if(value) {
      url.searchParams.set(updater.param, value)
    } else {
      url.searchParams.delete(updater.param)
    }
  })
  window.history.pushState({}, "", url.href)
  console.log(url.href)
}
