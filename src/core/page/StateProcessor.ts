import {debounce} from '../utils'

export class StateProcessor {
  client: any
  constructor(client: any, delay: number = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state: any) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
