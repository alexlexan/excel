const CODES = {
  A: 65,
  Z: 90,
}

function toCell(): string {
  return `
    <div class="cell" contenteditable></div>
    `
}

function toColumn(col: string): string {
  return `
    <div class="column">
        ${col}
    </div>
    `
}

function createRow(index: number, content: string): string {
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_: string, index: number): string {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount: number = 20): string {
  const colsCount: number = CODES.Z - CODES.A + 1
  const rows: string[] = []

  const cols: string = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
