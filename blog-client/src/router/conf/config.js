export const routeConfig = [
  {
    path: '/home/:type',
    name: 'home',
    meta: {
      title: '首页'
    }
  }, {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      title: '详情页'
    }
  }, {
    path: '/create',
    name: 'create',
    meta: {
      title: '写博客'
    }
  }, {
    path: '*',
    name: '404',
    meta: {
      title: '页面不存在'
    }
  },
]