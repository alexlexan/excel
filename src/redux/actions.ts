import {TableResizeHandler, IndexableString, IndexableObject,
  Indexable} from '@/type';
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

export function init() {
  return {
    type: '__INIT__',
  } as const
}

export function tableResize(data: TableResizeHandler) {
  return {
    type: TABLE_RESIZE,
    data,
  } as const
}

export function changeText(data: changeTextData) {
  return {
    type: CHANGE_TEXT,
    data,
  } as const
}

export function changeStyles(data: IndexableString) {
  return {
    type: CHANGE_STYLES,
    data,
  } as const
}

export function applyStyle(data: applyStyleData) {
  return {
    type: APPLY_STYLE,
    data,
  } as const
}

export function changeTitle(data: string) {
  return {
    type: CHANGE_TITLE,
    data,
  } as const
}

export function copyCells(data: copyCellsData) {
  return {
    type: COPY_CELLS,
    data,
  } as const
}

export function nextState(data: string) {
  return {
    type: NEXT_STATE,
    data,
  } as const
}

export function prevState(data: string) {
  return {
    type: PREV_STATE,
    data,
  } as const
}

export function updateData() {
  return {
    type: UPDATE_DATE,
  } as const
}


// Types

export type changeTextData = {
  id: string,
  value: string
}

type copyCellsData = {
  styles: IndexableObject,
  value: Indexable
}

type applyStyleData = {
  ids: string[],
  value: IndexableString
}
