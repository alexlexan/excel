import {State, rootReducerType, Actions} from '@/type'

export function createStore(rootReducer: rootReducerType, initialState: State) {
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
    dispatch(action: Actions) {
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
