import {State} from '@/type'
export function createStore(rootReducer: Function, initialState: State) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners: Function[] = []
  return {
    subscribe(fn: Function) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn)
        },
      }
    },
    dispatch(action: any) {
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
