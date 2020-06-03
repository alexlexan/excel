import {ExcelComponent} from '@core/ExcelComponent'
import {Dom, $} from '@/core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize} from './table.functions'

export interface EventTargetElement {
  target: HTMLElement;
}

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root: Dom) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  onMousedown(event: EventTargetElement): void {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  toHTML() {
    return createTable(20)
  }
}
