import {componentOptionsType} from './../excel/Excel';
import {Dom, $} from '@/core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {EventTargetElement} from '../table/Table';

export class Formula extends ExcelComponent {
  static className: string = 'excel__formula'

  constructor($root: Dom, options: object) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options as componentOptionsType,
    })
  }

  toHTML(): string {
    return `<div class="info">fx</div>
    <div id="formula-input" class="input" contenteditable spellcheck="false">
    </div>`
  }

  onInput(event: EventTargetElement): void {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event: EventTargetElement) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      event.preventDefault()
      this.$emit('formula:done', event.key)
      $(event.target).text('')
    }
  }

  init() {
    super.init()

    const $formula = this.$root.find('#formula-input')

    this.$on('table:select', ($cell:Dom) => {
      $formula.text($cell.text() as string)
    })

    this.$on('table:input', ($cell:Dom) => {
      $formula.text($cell.text() as string)
    })
  }
}
