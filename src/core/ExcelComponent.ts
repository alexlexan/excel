import {IndexableString} from './../type';
import {Store} from '@/type';
import {DomListener} from '@core/DomListener'
import {Dom} from '@/core/dom'
import {Emmiter} from '@/core/Emmiter'

import * as actions from '@/redux/actions'

export interface IOptions {
  name: string
  listeners: string[],
  emmiter: Emmiter
  store: Store,
  subscribe?: string[]
}

export type Literal = {
  [key: string]: string
}

export class ExcelComponent extends DomListener {
  name: string
  emmiter: Emmiter
  unsubscribers: Function[]
  store: Store
  subscribe: string[]

  constructor($root: Dom, options: IOptions) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store

    this.prepare()
  }

  // Настройка компонента до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
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

  $dispatch(action:any) {
    this.store.dispatch(action)
  }

  // Сюда приходят только те поля на которые мы подписались
  storeChanged(object:Literal, key: string) {}

  isWatching(key:string) {
    return this.subscribe.includes(key)
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
