interface IObject {
  [key: string]: Function[];
}

export class Emmiter {
  listeners: IObject
  constructor() {
    this.listeners = {}
  }

  // dispatch fire trigger
  emit(eventName: string, ...args: any[]) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args)
    })
    return true
  }

  subscribe(eventName: string, fn: Function) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      )
    }
  }
}
