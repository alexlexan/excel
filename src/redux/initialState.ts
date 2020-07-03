import {State} from '@/type'
import {defaultStyles, defaultTitle} from '@/constance'
import {clone} from '@core/utils'

export const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles,
  prevState: false,
  nextState: false,
  openedDate: new Date().toJSON,
}

const normalize = (state: State) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export function normalizeInitialState(state: State) {
  return state ? normalize(state) : clone(defaultState)
}
