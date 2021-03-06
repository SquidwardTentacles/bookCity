module.exports = {
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:3000', // 代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 代理的路径
        }
      }
    }
  }
}
