import {Dom} from './dom';
import {capitalize} from './utils'

export class DomListener {
  name: string

  constructor(readonly $root: Dom, readonly listeners: string[] = []) {
    if (!$root) {
      throw new Error('No $root provier for DomListener!')
    }
  }

  initDOMListeners(this:any):void {
    this.listeners.forEach((listener:string) => {
      const method = getMethodName(listener);

      this[method] = this[method].bind(this)
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implimented in ${this.name} Component`
        )
      }
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners():void {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, (this as any)[method])
    })
  }
}

function getMethodName(eventName: string): string {
  return 'on' + capitalize(eventName)
}
