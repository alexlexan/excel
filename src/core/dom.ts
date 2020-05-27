export interface IDom {
  selector: string | Element
  $el: Element
  append(node: Element | IDom): this
  html(html: string): string | this
  clear(): this
  on(eventType:string, callback:onFuncType):void
  off(eventType:string, callback:onFuncType):void
}
type onFuncType = (event:Event) => void

export class Dom implements IDom {
  selector: string | Element
  $el: Element
  constructor(selector: string | Element) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html: string) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType:string, callback:onFuncType) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType:string, callback:onFuncType) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node: Element | Dom) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
}

export function $(selector: string | Element): IDom {
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = ''): IDom => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
