import {componentOptionsType} from './../excel/Excel';
import {ExcelComponent} from '@core/ExcelComponent'
import {Dom} from '@/core/dom'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root: Dom, options: object) {
    super($root, {
      name: 'Toolbar',
      listeners: ['input'],
      ...options as componentOptionsType,
    })
  }

  onInput(event: Event): void {
    console.log('on Input formula', event)
  }

  toHTML() {
    return `<div class="button">
    <i class="material-icons">format_align_left</i>
  </div>

  <div class="button">
    <i class="material-icons">format_align_center</i>
  </div>

  <div class="button">
    <i class="material-icons">format_align_right</i>
  </div>

  <div class="button">
    <i class="material-icons">format_bold</i>
  </div>

  <div class="button">
    <i class="material-icons">format_italic</i>
  </div>

  <div class="button">
    <i class="material-icons">format_underlined</i>
  </div>`
  }
}
