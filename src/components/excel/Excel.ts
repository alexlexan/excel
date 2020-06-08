import {Emmiter} from '@/core/Emmiter'
import {Dom} from '@/core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@/core/dom'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

export interface IOptions {
  components: ComponentType[];
}

export type componentOptionsType = {
  emmiter: Emmiter,
}

type ComponentType =
  | typeof Header
  | typeof Toolbar
  | typeof Formula
  | typeof Table

export type ComponentTypeInstance = ExcelComponent

export class Excel {
  $el: Dom
  components: (ComponentType | ComponentTypeInstance)[] = []
  emmiter: Emmiter

  constructor(selector: string, options: IOptions) {
    this.$el = $(selector)
    this.components = options.components
    this.emmiter = new Emmiter()
  }

  getRoot(): Dom {
    const $root: Dom = $.create('div', 'excel')

    const componentOptions: componentOptionsType = {
      emmiter: this.emmiter,
    }

    this.components = this.components.map((Component: ComponentType) => {
      const $el: Dom = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render(): void {
    this.$el.append(this.getRoot())

    this.components.forEach((component: ComponentTypeInstance) =>
      component.init()
    )
  }

  destroy(): void {
    this.components.forEach((component: ComponentTypeInstance) =>
      component.destroy()
    )
  }
}
