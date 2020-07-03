import {storage} from '@core/utils'

function storageName(param: string) {
  return 'excel:' + param
}

export class LocalStorageClient {
  name: string
  constructor(name: string) {
    this.name = storageName(name)
  }

  save(state: any) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))
    // return new Promise((resolve) => {
    //   const state = storage(this.name)

    //   setTimeout(() => {
    //     resolve(state)
    //   }, 1500)
    // })
  }
}
