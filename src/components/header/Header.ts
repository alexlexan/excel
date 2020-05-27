import {ExcelComponent} from '@core/ExcelComponent'
import {IDom} from '@/core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root: IDom) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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
