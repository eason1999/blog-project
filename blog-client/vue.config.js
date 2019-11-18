const path = require('path')

module.exports = {
  devServer: {
    host: '192.168.200.54',
    // host: '192.168.31.130',
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '^/api': ''
        // }
      }
    },
  }
}