import {IndexableObject} from './../../type';
import {defaultStyles} from '@/constance';
import {EventTargetElement, IndexableString} from '@/type';
import {componentOptionsType} from '@/type';
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {Dom, $} from '@/core/dom'
import {createToolbar} from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root: Dom, options: object) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles', 'colState', 'rowState', 'dataState'],
      ...options as componentOptionsType,
    })
  }

  storeChanged(changes: IndexableObject) {
    this.setState(changes.currentStyles)
  }

  prepare() {
    this.initState(defaultStyles)
  }

  onClick(event: EventTargetElement): void {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = $target.data.value
      if (value === 'prevState' || value === 'nextState') {
        this.$emit('toolbar:historyState', value)
      } else {
        this.$emit('toolbar:applyStyle', JSON.parse(value))
      }
    }
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
}
