import {changeTextData} from './actions';
import {TableResizeHandler} from './../type'
import {IndexableObject, KeyState, Actions, Indexable, State} from '@/type'
import {
  TABLE_RESIZE,
  CHANGE_TITLE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  COPY_CELLS,
  NEXT_STATE,
  PREV_STATE,
  UPDATE_DATE,
} from './types'

const prevState: State[] = []
const nextState: State[] = []

export function rootReducer(state: State, action: Actions): State {
  let copyState
  let isEmptyState
  let field: KeyState
  let val: IndexableObject
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState.unshift({...state})
      return {
        ...state,
        [field]: value(state, field, action.data),
        ['prevState']: true,
        ['nextState']: false,
      }
    case CHANGE_TEXT:
      field = 'dataState'
      prevState.unshift({...state})
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action.data),
        ['prevState']: true,
        ['nextState']: false,
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      val = state['stylesState'] || {}
      action.data.ids.forEach((id: string) => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        ['stylesState']: val,
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
    case UPDATE_DATE:
      return {...state, openedDate: new Date().toJSON()}
    default:
      return state
  }
}

function value(
  state: State,
  field: KeyState,
  data: TableResizeHandler | changeTextData
) {
  const val = {...state[field] as Indexable} || {}
  val[data.id] = data.value
  return val
}

function changeState(prevState: State[], nextState: State[], state: State) {
  prevState.shift()
  nextState.unshift({...state})
}
