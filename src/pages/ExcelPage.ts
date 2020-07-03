import {LocalStorageClient} from './../shared/LocalStorageClient'
import {Subscribe} from './../type'
import {normalizeInitialState} from './../redux/initialState'
import {Page} from '@/core/page/Page'
import {createStore} from '@/core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {StateProcessor} from '@core/page/StateProcessor'

function storageName(param: string) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  excel: Excel
  storeSub: null | Subscribe
  processor: StateProcessor
  constructor(param: string) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }
  async getRoot() {
    const state = await this.processor.get()
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
