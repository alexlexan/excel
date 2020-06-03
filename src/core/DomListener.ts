import {Dom} from './dom';
import {capitalize} from './utils'

export class DomListener {
  $root: Dom
  listeners: string[]
  name: string

  constructor($root: Dom, listeners: string[] = []) {
    if (!$root) {
      throw new Error('No $root provier for DomListener!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners():void {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      const _this = (this as any); // Пересмотреть типизацию
      _this[method] = _this[method].bind(this)
      if (!_this[method]) {
        throw new Error(
          `Method ${method} is not implimented in ${_this.name} Component`
        )
      }
      this.$root.on(listener, _this[method])
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
