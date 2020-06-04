const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const business = require('./router/business')
const backControl = require('./router/manage-back')
// const bodyParser = require('koa-bodyparser')
// const formidable = require('koa-formidable')
const path = require('path')
const static = require('koa-static')
let { port, address, staticConfig } = require('./config.json')
app.keys = ['test']
app.use(async (ctx, next) => {
  // 保存来时的请求地址 允许跨域地址的操作
  let fromUrl = ctx.request.header.origin
  let allowOrigins = [
    `http://${address}:8080`,
    'http://127.0.0.1:8080',
    'http://localhost:8080',
  ]
  let url = ''
  if (allowOrigins.includes(fromUrl)) {
    url = fromUrl
  }
  console.log(url, 'url')

  ctx.append("Access-Control-Allow-Origin", url)
  ctx.append('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  ctx.append("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS")
  await next()
})

app.use(session({
  storage: '',
  get (key) {
    return this.storage[key]
  },
  set (key, value) {
    this.storage[key] = value
  },
  destroy (key) {
    delete this.destroy[key]
  }
}, app))
// app.use(formidable())
// app.use(bodyParser())
app.use(static(path.resolve('./file/txt')))
app.use(business.routes())
// console.log(backControl, 'sssss')

app.use(backControl.router.routes())

app.listen(port, address, () => {
  console.log('running.....' + address + ':' + port)
})