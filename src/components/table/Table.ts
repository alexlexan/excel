import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {toObjectStyles, debounce} from '@/core/utils'
import {defaultStyles} from '@/constance'
import {
  componentOptionsType,
  EventTargetElement,
  IndexableString,
  IndexableObject,
} from '@/type'
import {TableSelection} from './TableSelection'
import {Dom, $} from '@/core/dom'
import {parse} from '@/core/parse'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector,
  setWriteMode,
  selectCells,
  getСopiedCells,
} from './table.functions'
import * as actions from '@/redux/actions'

export class Table extends ExcelStateComponent {
  static className = 'excel__table'
  selection: TableSelection
  isInCell: boolean
  copyTextCell: Array<Array<string>>

  constructor($root: Dom, options: componentOptionsType) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'dblclick', 'input'],
      ...options,
    })
    this.isInCell = false
    this.copyTextCell = []
  }

  prepare() {
    this.selection = new TableSelection()
  }

  onMousedown(event: EventTargetElement): void {
    if (shouldResize(event)) {
      this.resizeTable(event)
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

  onKeydown(event: EventTargetElement) {
    let {key} = event
    const $target = $(event.target)
    const isEditable = $target.attr('contenteditable')
    const keys = ['Enter', 'Tab']
    const keysNav = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const ctrlC = event.ctrlKey && event.keyCode === 67 && isEditable == 'false'
    const ctrlV = event.ctrlKey && event.keyCode === 86 && isEditable == 'false'
    const isNavKey = [...keys, ...keysNav].includes(key)
    const isNavKeyInCell = this.isInCell && keysNav.includes(key)
    const shiftKeyInCell = this.isInCell && event.shiftKey && key == 'Enter'
    const notNavKey =
      isEditable == 'false' &&
      ![...keys, ...keysNav].includes(key) &&
      !event.shiftKey &&
      !event.ctrlKey

    if (notNavKey) {
      setWriteMode($target, this.isInCell)
    }

    if (ctrlC) {
      this.copyTextCell = []
      const $cells = matrix($target, this.selection.current).map((id: string) =>
        this.$root.find(`[data-id="${id}"]`)
      )
      const textInCell = $cells.map(($el) => $el.text())
      const matrixSize = selectCells($cells)

      const stylesCells: string[] = []
      $cells.forEach(($el) => {
        const style = $el.attr('style').replace(/width:.*;/, '').trim()
        stylesCells.push(style)
      })
      // без width
      this.selection.selectGroup($cells, true)
      this.copyTextCell.push(matrixSize, textInCell, stylesCells)
    }

    if (ctrlV) {
      const [indexCells, textCells, styleCells] = this.copyTextCell
      if (this.copyTextCell.length == 0) return

      const $cells = getСopiedCells(indexCells, $target, this.$root)
      const value: IndexableString = {}
      const styles: IndexableObject = {}

      $cells.forEach(($el, index) => {
        const id = $el.id()
        value[id] = textCells[index]
        styles[id] = toObjectStyles(styleCells[index])
        $el.text(textCells[index])
        $el.attr('data-value', textCells[index])
        $el.attr('style', styleCells[index])
      })

      this.$dispatch(
        actions.copyCells({
          value,
          styles,
        })
      )
    }

    if (isNavKey) {
      if (isNavKeyInCell || shiftKeyInCell) return
      if (event.shiftKey) {
        key = `Shift${key}`
      }
      event.preventDefault()
      this.isInCell = false
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onDblclick(event: EventTargetElement) {
    const $target = $(event.target)
    if ($target.attr('contenteditable') == 'true') return

    this.isInCell = true
    setWriteMode($target, this.isInCell)
  }

  onInput(event: EventTargetElement) {
    const textInCell = $(event.target).text()
    this.updateTextInStore(textInCell)
    this.selection.current.attr('data-value', textInCell)
  }

  toHTML() {
    return this.template
  }

  get template() {
    return createTable(20, this.store.getState())
  }

  selectCell($cell: Dom) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event: EventTargetElement) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableReize(data))
    } catch (e) {
      console.warn('Resize data', e.message)
    }
  }

  updateTextInStore(value: string) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (textInCell: string) => {
      this.updateTextInStore(textInCell)
      this.selection.current.attr('data-value', textInCell)
      this.selection.current.text(parse(textInCell))
    })
    this.$on('formula:done', (eventName: string) => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(eventName, id))
      this.selection.select($next)
    })
    this.$on('toolbar:applyStyle', (value: IndexableString) => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      )
    })

    this.$on('toolbar:historyState', (value: string) => {
      if ( value === 'prevState') {
        this.$dispatch(
          actions.prevState(value)
        )
      } else if (value === 'nextState') {
        this.$dispatch(
          actions.nextState(value)
        )
      }
      const state = this.store.getState()
      this.setState(state)
    })
  }
}
