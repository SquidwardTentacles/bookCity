const Koa = require('koa')
const app = new Koa()

const business = require('./router/business')
let { port } = require('./config')
// const fs = require('fs')
// fs.readFile('./app.js', (err, data) => {
//   if (err) console.log(err)
//   console.log(data, 'data');

// })

app.use(business.routes())

app.listen(port, () => {
  console.log('running.....' + port);

})