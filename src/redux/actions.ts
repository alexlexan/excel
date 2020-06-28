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

export function tableReize(data: object) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data: object) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}

export function changeStyles(data: object) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data: object) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

export function changeTitle(data: string) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}

export function copyCells(data: object) {
  return {
    type: COPY_CELLS,
    data,
  }
}

export function nextState(data: string) {
  return {
    type: NEXT_STATE,
    data,
  }
}

export function prevState(data: string) {
  return {
    type: PREV_STATE,
    data,
  }
}
