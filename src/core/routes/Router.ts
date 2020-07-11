import {ExcelPage} from '@/pages/ExcelPage'
import {DashboardPage} from '@/pages/DashboardPage'
import {RoutesType} from '@/type'
import {ActiveRoute} from './ActiveRoute'
import {Dom, $} from '@/core/dom'
import {loader} from '@/components/Loader'


export class Router {
  $placeholder: Dom
  loader: Dom
  page: DashboardPage | ExcelPage | null
  constructor(selector: string, readonly routes: RoutesType) {
    this.$placeholder = $(selector)
    this.loader = loader()
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
