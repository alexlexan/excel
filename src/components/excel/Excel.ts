import {StoreSubscriber} from '@/core/StoreSubscriber'
import {Emmiter} from '@/core/Emmiter'
import {Dom} from '@/core/dom'
import {$} from '@/core/dom'
import {ComponentNameType,
  ComponentTypeInstance,
  Store, ExcelOptions, componentOptionsType} from '@/type'
import {updateData} from '@/redux/actions'

export class Excel {
  $el: Dom
  components: (ComponentNameType | ComponentTypeInstance)[] = []
  emmiter: Emmiter
  store: Store
  subscriber: StoreSubscriber
  constructor(options: ExcelOptions) {
    this.components = options.components
    this.emmiter = new Emmiter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot(): Dom {
    const $root = $.create('div', 'excel')

    const componentOptions: componentOptionsType = {
      emmiter: this.emmiter,
      store: this.store,
    }

    this.components = this.components.map((Component: ComponentNameType) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  init(): void {
    this.store.dispatch(updateData())
    this.subscriber
      .subscribeComponents(this.components as ComponentTypeInstance[])

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
