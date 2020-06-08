import {Dom} from '@/core/dom'
export class TableSelection {
  group: Dom[]
  current: null | Dom
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el: Dom): void {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group: Dom[] = []) {
    this.clear()

    this.group = $group
    this.group.forEach(($el) => $el.addClass(TableSelection.className))
  }
}
