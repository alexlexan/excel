import {EventTargetElement} from './../components/table/Table';
import {matrixObject} from './../components/table/table.functions'

type onFuncType = (event: EventTargetElement | KeyboardEvent | Event) => void
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

  text(text?:string) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return (this.$el as HTMLInputElement).value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear(): this {
    this.html('')
    return this
  }

  on(eventType: string, callback: onFuncType, options?: object): void {
    this.$el.addEventListener(eventType, callback, options)
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

  find(selector: string) {
    return $(this.$el.querySelector(selector) as HTMLElement)
  }

  findAll(selector: string) {
    return this.$el.querySelectorAll(selector)
  }

  findProperty(
    selector: Dom,
    property: string,
    defaultProp?: any,
    getProp?: boolean
  ) {
    const valueProp = getComputedStyle(selector.$el).getPropertyValue(property)
    if (getProp) return valueProp
    if (typeof valueProp != 'number') {
      return +/\d+/.exec(valueProp)
    } else {
      return defaultProp
    }
  }

  addClass(className: string) {
    this.$el.classList.add(className)
  }

  removeClass(className: string) {
    this.$el.classList.remove(className)
  }

  css(styles: StylesType = {}): void {
    Object.keys(styles).forEach((key: string) => {
      const style: ICSS = this.$el.style
      style[key] = styles[key]
    })
  }

  id(parse?:boolean):string | matrixObject {
    if (parse) {
      const parsed:string[] = (this.id() as string).split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  attr(attribute:string, value?:string) {
    if (value) {
      this.$el.setAttribute(attribute, value)
      return this
    }
    return this.$el.getAttribute(attribute)
  }

  focus() {
    this.$el.focus()
    return this
  }

  blur() {
    this.$el.blur()
    return this
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
