export interface IDom {
  selector: string | HTMLElement
  $el: HTMLElement
  append(node: HTMLElement | IDom): this
  html(html: string): string | this
  clear(): this
  on(eventType:string, callback:onFuncType):void
  off(eventType:string, callback:onFuncType):void
  closest(selector:string):IDom
  getCoords(): DOMRect
  findAll(selector:string): NodeListOf<Element>
  css(styles:StylesType):void
  data:DOMStringMap
  findProperty(selector:Dom, property:string):string
}

type onFuncType = (event:Event) => void
type StylesType = {
  [name:string]:string
}
interface ICSS extends CSSStyleDeclaration {
  [name:string]:any
}

export class Dom implements IDom {
  selector: string | HTMLElement
  $el: HTMLElement
  constructor(selector: string | HTMLElement) {
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

  append(node: HTMLElement | Dom) {
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

  closest(selector:string) {
    return $(this.$el.closest<HTMLElement>(selector))
  }

  get data() {
    return this.$el.dataset
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector:string) {
    return this.$el.querySelectorAll(selector)
  }

  findProperty(selector:Dom, property:string) {
    return getComputedStyle(selector.$el).getPropertyValue(property)
  }

  css(styles:StylesType={}):void {
    Object.keys(styles).forEach((key:string) => {
      const style: ICSS = this.$el.style
      style[key] = styles[key]
    })
  }
}

export function $(selector: string | HTMLElement): IDom {
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = ''): IDom => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
