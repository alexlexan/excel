import {IOptions, componentOptionsType} from './../excel/Excel';
import {ExcelComponent} from '@core/ExcelComponent'
import {Dom} from '@/core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root: Dom, options: object) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options as componentOptionsType,
    })
  }

  onInput(event: Event): void {
    console.log('on Input formula', event)
  }

  toHTML() {
    return `
    <input type="text" class="input" value="Новая таблица" />
    <div>

      <div class="button">
        <i class="material-icons">delete</i>
      </div>

      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>

    </div>`
  }
}
