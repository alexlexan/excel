import {IndexableString} from '@/type'
import {Dom} from '@/core/dom'
import {selectCells} from './table.functions'

export class TableSelection {
  group: Dom[]
  current: null | Dom
  static selected = 'selected'
  static selectedTop = 'selected__top'
  static selectedBottom = 'selected__bottom'
  static selectedLeft = 'selected__left'
  static selectedRight = 'selected__right'
  static selectedBackground = 'selected__background'
  static copy = 'copy'
  static sel = 'sel'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el: Dom): void {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.selected)
  }

  clear() {
    this.group.forEach(($el) =>
      $el.removeClass([
        TableSelection.selected,
        TableSelection.selectedTop,
        TableSelection.selectedBottom,
        TableSelection.selectedLeft,
        TableSelection.selectedRight,
        TableSelection.selectedBackground,
        TableSelection.copy,
        TableSelection.sel,
      ])
    )
    this.group = []
  }

  selectGroup($group: Dom[] = [], copy?: boolean) {
    this.clear()

    this.group = $group
    const [leftCol, rightCol, topRow, BottomRow] = selectCells(this.group)

    this.group.forEach(($el) => {
      const dataset = $el.data
      $el.addClass(TableSelection.selectedBackground)
      copy && $el.addClass(TableSelection.copy)
      if (dataset.row === topRow) {
        $el.addClass(TableSelection.selectedTop)
      }
      if (dataset.row === BottomRow) {
        $el.addClass(TableSelection.selectedBottom)
      }
      if (dataset.col === leftCol) {
        $el.addClass(TableSelection.selectedLeft)
      }
      if (dataset.col === rightCol) {
        $el.addClass(TableSelection.selectedRight)
      }
    })
  }

  applyStyle(style: IndexableString) {
    this.group.forEach(($el) => $el.css(style))
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id())
  }
}
