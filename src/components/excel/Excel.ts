import {StoreSubscriber} from '@/core/StoreSubscriber'
import {Emmiter} from '@/core/Emmiter'
import {Dom} from '@/core/dom'
import {$} from '@/core/dom'
import {ComponentNameType,
  ComponentTypeInstance,
  Store, ExcelOptions, componentOptionsType} from '@/type'

export class Excel {
  $el: Dom
  components: (ComponentNameType | ComponentTypeInstance)[] = []
  emmiter: Emmiter
  store: Store
  subscriber: StoreSubscriber
  constructor(selector: string, options: ExcelOptions) {
    this.$el = $(selector)
    this.components = options.components
    this.emmiter = new Emmiter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot(): Dom {
    const $root: Dom = $.create('div', 'excel')

    const componentOptions: componentOptionsType = {
      emmiter: this.emmiter,
      store: this.store,
    }

    this.components = this.components.map((Component: ComponentNameType) => {
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

    this.subscriber.subscribeComponents(this.components as ComponentNameType[])

    this.components.forEach((component: ComponentTypeInstance) =>
      component.init()
    )
  }

  destroy(): void {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach((component: ComponentTypeInstance) =>
      component.destroy()
    )
  }
}
