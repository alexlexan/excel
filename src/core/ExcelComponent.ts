import {DomListener} from '@core/DomListener'
import {Dom} from '@/core/dom'

interface IOptions {
  name: string
  listeners: string[]
}

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  name: string
  constructor($root: Dom, options: IOptions) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  toHTML():string {
    return ''
  }

  init():void {
    this.initDOMListeners()
  }

  destroy():void {
    this.removeDOMListeners()
  }
}
