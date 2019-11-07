export const routeConfig = [
  {
    path: '/home/:id',
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
    path: '/404',
    name: '404',
    meta: {
      title: '页面不存在'
    }
  },
]