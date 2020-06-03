// export interface IDom {
//   $el: HTMLElement
//   append(node: HTMLElement | Dom): this
//   html(html: string): string | this
//   clear(): this
//   on(eventType:string, callback:onFuncType):void
//   off(eventType:string, callback:onFuncType):void
//   closest(selector:string):Dom
//   getCoords(): DOMRect
//   findAll(selector:string): NodeListOf<Element>
//   css(styles:StylesType):void
//   data:DOMStringMap
//   findProperty(selector:Dom, property:string):string
// }

type onFuncType = (event: Event) => void
type StylesType = {
  [name: string]: string,
}
interface ICSS extends CSSStyleDeclaration {
  [name: string]: any;
}

export class Dom {
  $el: HTMLElement
  constructor(selector: string | HTMLElement) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html: string): string | this {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear(): this {
    this.html('')
    return this
  }

  on(eventType: string, callback: onFuncType): void {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType: string, callback: onFuncType) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node: HTMLElement | Dom): this {
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

  closest(selector: string) {
    return $(this.$el.closest<HTMLElement>(selector))
  }

  get data() {
    return this.$el.dataset
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector: string) {
    return this.$el.querySelectorAll(selector)
  }

  findProperty(
    selector: Dom,
    property: string,
    defaultProp?: any,
    string?: boolean
  ) {
    const valueProp = getComputedStyle(selector.$el).getPropertyValue(property)
    if (string) return valueProp
    if (typeof valueProp != 'number') {
      return +/\d+/.exec(valueProp)
    } else {
      return defaultProp
    }
  }

  css(styles: StylesType = {}): void {
    Object.keys(styles).forEach((key: string) => {
      const style: ICSS = this.$el.style
      style[key] = styles[key]
    })
  }
}

export function $(selector: string | HTMLElement): Dom {
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = ''): Dom => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
