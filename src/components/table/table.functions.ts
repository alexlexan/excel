import {Dom} from '@/core/dom'
import {range} from '@core/utils'
import {EventTargetElement, TableMatrix} from '@/type'


export function shouldResize(event: EventTargetElement): string {
  return event.target.dataset.resize
}

export function isCell(event: EventTargetElement): boolean {
  return event.target.dataset.type == 'cell'
}

export function matrix($target: Dom, $current: Dom): string[] {
  const target = ($target.id(true))
  const current = ($current.id(true))

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function getСopiedCells(indexCells: string[], $target: Dom, $root: Dom) {
  const [leftCol, rightCol, topRow, BottomRow] = indexCells
  const col = Number($target.data.col) + Number(rightCol) - Number(leftCol)
  const row = Number($target.data.row) + Number(BottomRow) - Number(topRow)
  const $current = $root.find(`[data-id="${row}:${col}"]`)

  return matrix($target, $current).map((id: string) =>
    $root.find(`[data-id="${id}"]`)
  )
}

export function selectCells($group: Dom[]) {
  const matrix = $group.map(($el) => $el.data)
  const lastIndex = matrix.length - 1
  const leftCol = matrix[0].col
  const rightCol = matrix[lastIndex].col
  const topRow = matrix[0].row
  const BottomRow = matrix[lastIndex].row

  return [leftCol, rightCol, topRow, BottomRow]
}

export function nextSelector(key: string, id:TableMatrix) {
  let {col, row} = id
  const MIN_VALUE = 0
  const MAX_VALUE = 25
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE ? MAX_VALUE : col + 1
      break
    case 'ShiftTab':
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ShiftEnter':
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}

function observerBlur(event: EventTargetElement | KeyboardEvent): void {
  (event.target as HTMLElement).setAttribute('contenteditable', 'false')
}

export function setWriteMode($target: Dom, isInCell: boolean) {
  $target.attr('contenteditable', 'true')
  $target.blur().focus()
  if (!isInCell) $target.text('')

  $target.on('blur', observerBlur, {once: true})
}


export function getMinResize(
  widthColumn: number,
  minWidthColumn: number,
  areaWidthResizer: number
): number {
  return -widthColumn + minWidthColumn + areaWidthResizer
}
