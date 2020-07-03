import {IndexableString} from '@/type';
import {EventTargetElement} from '@/type';
import {TableMatrix} from '@/type'

type onFuncType = (event: EventTargetElement | KeyboardEvent | Event) => void
interface ICSS extends CSSStyleDeclaration {
  [name: string]: any;
}

interface IDataSet extends DOMStringMap {
  [name: string]: string;
}

export class Dom {
  $el: HTMLElement;
  static this: Dom
  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(): string
  html(html:string): this
  html(html?: string): string | this {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(): string
  text(text:string): Dom
  text(text?:string): Dom | string {
    if (typeof text !== 'undefined') {
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
    return $(this.$el.querySelector(selector))
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


  addClass(className: string | string[]) {
    if (typeof className == 'string') {
      this.$el.classList.add(className)
      return this
    }
    this.$el.classList.add(...className as string[])
    return this
  }

  removeClass(className: string[]) {
    this.$el.classList.remove(...className)
    return this
  }

  css(styles: IndexableString = {}): void {
    Object.keys(styles).forEach((key: string) => {
      const style: ICSS = this.$el.style
      style[key] = styles[key]
    })
  }

  getStyles(styles:string[] = []) {
    return styles.reduce((res:IndexableString, s:any) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  id():string
  id(parse:boolean):TableMatrix
  id(parse?:boolean):string | TableMatrix {
    if (parse) {
      const parsed:string[] = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  attr(attribute:string): string;
  attr(attribute:string, value:string): Dom;
  attr(attribute:string, value?:string): string | Dom {
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

export function $(selector: HTMLElement): Dom
export function $(selector: string): Dom
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
