import {Store, State, KeyState} from '@/type'
import {isEqual} from './utils'
import {ComponentTypeInstance} from '@/type'

type SubscribeType = {
  unsubscribe(): void,
}

export class StoreSubscriber {
  store: Store
  sub: null | SubscribeType
  prevState: State
  constructor(store: Store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components: ComponentTypeInstance[]) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe((state: State) => {
      Object.keys(state).forEach((key: KeyState) => {
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
