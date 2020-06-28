import {Store} from '@/type'
import {isEqual} from './utils'
import {ComponentTypeInstance} from '@/type'

type SubscribeType = {
  unsubscribe(): void,
}

type ObjectLiteral = {
  [key: number]: string,
  [key: string]: string,
}

export class StoreSubscriber {
  store: Store
  sub: null | SubscribeType
  prevState: ObjectLiteral
  constructor(store: Store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components: any) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe((state: ObjectLiteral) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component: ComponentTypeInstance) => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes, key)
            }
          })
        }
      })

      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
