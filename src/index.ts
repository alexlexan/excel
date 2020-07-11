import {ExcelPage} from './pages/ExcelPage'
import {DashboardPage} from './pages/DashboardPage'
import {Router} from './core/routes/Router'
import './scss/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
