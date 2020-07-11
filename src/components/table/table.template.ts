import {parse} from '@/core/parse'
import {defaultStyles} from '@/constance'
import {State, Indexable} from '@/type'
import {toInlineStyles} from '@/core/utils'

const CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state: State, row: number) {
  return function (_: string, col: number) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })
    return `
    <div  class="cell" 
          contenteditable=false
          tabindex="0"
          data-col="${col}"
          data-row="${row}"
          data-id="${id}"
          data-value="${data || ''}"
          data-type="cell"
          style="${styles}; width: ${width};"
    >
      ${parse(data) || ''}
    </div>
    `
  }
}
// contenteditable
function toColumn({
  col,
  index,
  width,
}: {
  col: string,
  index: number,
  width: string,
}): string {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}"
    >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index: number, content: string, state?: Indexable): string {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height:${height}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_: string, index: number): string {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state: Indexable, index: number) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state: Indexable, index: number) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state: State) {
  return function (col: string, index: number) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount: number = 50, state: State = {}): string {
  const colsCount: number = CODES.Z - CODES.A + 1
  const rows: string[] = []

  const cols: string = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
