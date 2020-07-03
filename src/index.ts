import {ExcelPage} from './pages/ExcelPage'
import {DashboardPage} from './pages/DashboardPage'
import {Router} from './core/routes/Router'
import './scss/index.scss'
// import {initialState} from './redux/initialState'
// import {Excel} from '@/components/excel/Excel'
// import {Header} from '@/components/header/Header'
// import {Toolbar} from '@/components/toolbar/Toolbar'
// import {Formula} from '@/components/formula/Formula'
// import {Table} from '@/components/table/Table'
// import {createStore} from '@/core/createStore'
// import {rootReducer} from './redux/rootReducer'
// import {storage, debounce} from './core/utils'

// const store = createStore(rootReducer, initialState)

// const stateListener = debounce((state: object) => {
//   console.log('App State: ', state)
//   storage('excel-state', state)
// }, 500)

// store.subscribe(stateListener)

// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// })

// excel.render()

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
