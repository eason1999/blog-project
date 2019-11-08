import { routeConfig } from './config'

const handleRoutes = (routes) => (
  routes.map(item => {
    const component = () => import(
      /* webpackChunkName: 'item.name' */
      `@/views/${item.name}/Index.vue`
    )
    return {
      ...item,
      component
    }
  })
)

const _routes = handleRoutes(routeConfig)

const routes = [
  {
    path: '/',
    redirect: '/home/new',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home',
    redirect: '/home/new',
    meta: {
      title: '首页'
    }
  },
  ..._routes
]

export default routes