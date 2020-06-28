import {IndexableString} from './../type'
import {Dom} from './dom'
import {ExcelComponent, IOptions} from './ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  state: IndexableString
  constructor($root: Dom, options: IOptions) {
    super($root, options)
  }

  get template() {
    // переопределить для каждого нового компонента
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }

  setState(newState: any) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
