import Vue from 'vue'
import Router from 'vue-router'
import routes from './conf'

Vue.use(Router)

const router = new Router({ routes })

const routeFilter = (routes, name) => {
  const routesArr = routes.filter(item => item.name === name)
  return routesArr.length > 0
}

const routesIntercept = [
  (to, from, next) => {
    routeFilter(routes, to.name) ? next() : next({ path: '/404' })
  }
]

routesIntercept.forEach(item => {
  router.beforeEach(item)
})

router.afterEach((to, from) => {
  document.title = to.meta.title || '博客'
})

export default router