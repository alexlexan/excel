import {componentOptionsType} from './../excel/Excel';
import {TableSelection} from './TableSelection'
import {ExcelComponent} from '@core/ExcelComponent'
import {Dom, $} from '@/core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize,
  isCell, matrix, nextSelector, observerBlur} from './table.functions'
import {matrixObject} from './table.functions'

export interface EventTargetElement {
  target: HTMLElement;
  shiftKey: boolean;
  key: string;
  preventDefault():void
}

export class Table extends ExcelComponent {
  static className = 'excel__table'
  selection: TableSelection
  keyboard: boolean

  constructor($root: Dom, options: object) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'dblclick', 'keypress', 'input'],
      ...options as componentOptionsType
    })
    this.keyboard = true
  }

  prepare() {
    this.selection = new TableSelection()
  }

  onMousedown(event: EventTargetElement): void {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $cells = matrix(
          $target,
          this.selection.current
        ).map((id: string) => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const keysNav = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]

    const {key} = event
    if ([...keys, ...keysNav].includes(key) && !event.shiftKey) {
      if (!this.keyboard && keysNav.includes(key)) {
        return
      }
      event.preventDefault()
      this.keyboard = true
      const id = (this.selection.current.id(true) as matrixObject)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onKeypress(event: EventTargetElement) {
    const $target = $(event.target)
    const flag = $target.attr('contenteditable')

    if (flag != 'true') {
      $target.attr('contenteditable', 'true')
      $target.blur().focus().text('')

      $target.on('blur', observerBlur, {once: true})
    }
  }

  onDblclick(event: EventTargetElement) {
    const $target = $(event.target)
    if ($target.attr('contenteditable') == 'true') return

    this.keyboard = false
    $target.attr('contenteditable', 'true')
    $target.blur().focus()

    $target.on('blur', observerBlur, {once: true})
  }

  onInput(event: EventTargetElement) {
    this.$emit('table:input', $(event.target))
  }

  toHTML() {
    return createTable(20)
  }

  selectCell($cell:Dom) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text:string) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', (eventName:string) => {
      const id = (this.selection.current.id(true) as matrixObject)
      const $next = this.$root.find(nextSelector(eventName, id))
      this.selection.select($next)
    })
  }
}

