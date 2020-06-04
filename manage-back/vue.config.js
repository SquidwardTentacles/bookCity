module.exports = {
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://127.0.0.1:3000', // 代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/back' // 代理的路径
        }
      }
    }
  }
}
