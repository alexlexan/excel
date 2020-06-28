import {
  TABLE_RESIZE,
  CHANGE_TITLE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  COPY_CELLS,
  NEXT_STATE,
  PREV_STATE
} from './types'

const prevState: any[] = []
const nextState: any[] = []

export function rootReducer(state: any, action: any) {
  let copyState
  let isEmptyState
  let field
  let val: any
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState.unshift({...state})
      return {
        ...state,
        [field]: value(state, field, action),
        ['prevState']: true,
        ['nextState']: false,
      }
    case CHANGE_TEXT:
      field = 'dataState'
      prevState.unshift({...state})
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
        ['prevState']: true,
        ['nextState']: false,
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach((id: any) => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    case COPY_CELLS:
      prevState.unshift({...state})
      return {
        ...state,
        ['dataState']: {...state.dataState, ...action.data.value},
        ['stylesState']: {...state.stylesState, ...action.data.styles},
        ['prevState']: true,
        ['nextState']: false,
      }
    case PREV_STATE:
      copyState = [...prevState]
      isEmptyState = copyState.length
      if (isEmptyState) {
        changeState(prevState, nextState, state)
        return {
          ...copyState[0],
          ['prevState']: !!prevState.length,
          ['nextState']: true,
        }
      }
      return {...state}
    case NEXT_STATE:
      copyState = [...nextState]
      isEmptyState = copyState.length
      if (isEmptyState) {
        changeState(nextState, prevState, state)
        return {
          ...copyState[0],
          ['prevState']: true,
          ['nextState']: !!nextState.length,
        }
      }
      return {...state}
    default:
      return state
  }
}

function value(state: any, field: string, action: any) {
  const val = {...state[field]} || {}
  val[action.data.id] = action.data.value
  return val
}

function changeState(prevState:any, nextState:any, state:any) {
  prevState.shift()
  nextState.unshift({...state})
}
