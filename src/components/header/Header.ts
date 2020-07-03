import {ActiveRoute} from '@core/routes/ActiveRoute'
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
      listeners: ['input', 'keydown', 'click'],
      ...options,
    })
  }

  onKeydown(event: EventTargetElement) {
    const {key} = event
    if (key == 'Enter') {
      $(event.target).blur()
    }
  }

  onInput(event: EventTargetElement): void {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event: EventTargetElement) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить таблицу')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}" />
    <div>

      <div class="button" data-button="remove">
        <i class="material-icons" data-button="remove">delete</i>
      </div>

      <div class="button" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </div>

    </div>`
  }
}
