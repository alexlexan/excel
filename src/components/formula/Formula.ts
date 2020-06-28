import {IndexableString} from './../../type'
import {componentOptionsType, EventTargetElement} from '@/type'
import {Dom, $} from '@/core/dom'
import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className: string = 'excel__formula'
  $formula: Dom

  constructor($root: Dom, options: componentOptionsType) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  toHTML(): string {
    return `<div class="info">fx</div>
    <div id="formula-input" class="input" contenteditable spellcheck="false">
    </div>`
  }

  storeChanged({currentText}: IndexableString) {
    this.$formula.text(currentText)
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

    this.$formula = this.$root.find('#formula-input')

    this.$on('table:select', ($cell: Dom) => {
      this.$formula.text($cell.data.value)
    })
  }
}
