import {DomListener} from '@core/DomListener'
import {Dom} from '@/core/dom'
import {Emmiter} from '@/core/Emmiter'

interface IOptions {
  name: string
  listeners: string[],
  emmiter: Emmiter
}

export class ExcelComponent extends DomListener {
  name: string
  emmiter: Emmiter
  unsubscribers: Function[]
  constructor($root: Dom, options: IOptions) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.unsubscribers = []

    this.prepare()
  }

  // Настройка компонента до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML():string {
    return ''
  }

  // Уведомляем слушателей про событие
  $emit(eventName:string, ...args:any[]) {
    this.emmiter.emit(eventName, ...args)
  }

  // подписываемся на событие
  $on(eventName:string, fn:Function) {
    const unsub = this.emmiter.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  // Иницилиазация компонента и добавление Dom слушателей
  init():void {
    this.initDOMListeners()
  }

  destroy():void {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
