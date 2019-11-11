/**
 * @description 公共方法
 * @param routes 路由集
 * @param app app实例
 */
const handleRoute = (app, routes) => {
  console.log(routes, 888)
  routes.forEach(route => app.use(route.routes(), route.allowedMethods()))

}

module.exports = {
  handleRoute
}