import {Dom} from '@/core/dom'
import {range} from '@core/utils'
import {EventTargetElement} from './Table'

export interface matrixObject {
  col: number;
  row: number;
}

export function shouldResize(event: EventTargetElement): string {
  return event.target.dataset.resize
}

export function isCell(event: EventTargetElement): boolean {
  return event.target.dataset.type == 'cell'
}

export function matrix($target: Dom, $current: Dom) {
  const target = ($target.id(true) as matrixObject)
  const current = ($current.id(true) as matrixObject)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key: string, id:matrixObject) {
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
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}

export function observerBlur(event: EventTargetElement | KeyboardEvent): void {
  (event.target as HTMLElement).setAttribute('contenteditable', 'false')
}

export function getMinResize(
  widthColumn: number,
  minWidthColumn: number,
  areaWidthResizer: number
): number {
  return -widthColumn + minWidthColumn + areaWidthResizer
}
