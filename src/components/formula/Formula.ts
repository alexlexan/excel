import {Dom} from '@/core/dom'
import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className: string = 'excel__formula'

  constructor($root: Dom) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  toHTML(): string {
    return `<div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>`
  }

  onInput(event: Event): void {
    console.log('on Input formula', event)
  }
}
