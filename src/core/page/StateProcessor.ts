import {State} from '@/type';
import {LocalStorageClient} from '@/shared/LocalStorageClient'
import {debounce} from '../utils'

export class StateProcessor {
  constructor(readonly client: LocalStorageClient, delay: number = 300) {
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state: State) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
