import {IDom} from '@/core/dom'
import {$} from '@/core/dom'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

export interface IOptions {
  components: InterfaceComponent[];
}

type InterfaceComponent =
  | typeof Header
  | typeof Toolbar
  | typeof Formula
  | typeof Table

export type InterfaceComponentClass = Header | Toolbar | Formula | Table

export class Excel {
  $el: IDom
  components: (InterfaceComponent | InterfaceComponentClass)[] = []

  constructor(selector: string, options: IOptions) {
    this.$el = $(selector)
    this.components = options.components
  }

  getRoot(): IDom {
    const $root: IDom = $.create('div', 'excel')

    this.components = this.components.map((Component: InterfaceComponent) => {
      const $el: IDom = $.create('div', Component.className)
      const component = new Component($el)
      if (component.name) {
        (window as any)['c' + component.name] = component
      }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render(): void {
    this.$el.append(this.getRoot())

    this.components.forEach((component: InterfaceComponentClass) =>
      component.init()
    )
  }
}
