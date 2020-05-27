import {ExcelComponent} from '@core/ExcelComponent'
import {IDom} from '@/core/dom'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root: IDom) {
    super($root, {
      name: 'Table',
      listeners: ['input'],
    })
  }

  onInput(event: Event): void {
    console.log('on Input formula', event)
  }

  toHTML() {
    return createTable()
  }
}
