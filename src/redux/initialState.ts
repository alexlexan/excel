import {State} from '@/type'
import {defaultStyles, defaultTitle} from '@/constance'
import {storage} from '@/core/utils'

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
}

const normalize = (state: State) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
