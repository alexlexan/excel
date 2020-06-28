import {componentOptionsType, EventTargetElement} from '@/type'
import {ExcelComponent} from '@core/ExcelComponent'
import {Dom, $} from '@/core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constance'

export class Header extends ExcelComponent {
  static className: string = 'excel__header'

  constructor($root: Dom, options: componentOptionsType) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  onKeydown(event: EventTargetElement) {
    const {key} = event
    if ( key == 'Enter') {
      $(event.target).blur()
    }
  }

  onInput(event: EventTargetElement): void {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}" />
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
