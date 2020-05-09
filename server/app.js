const Koa = require('koa')
const app = new Koa()

const business = require('./router/business')
let { port } = require('./config')
// const fs = require('fs')
// fs.readFile('./app.js', (err, data) => {
//   if (err) console.log(err)
//   console.log(data, 'data');

// })

app.use(async (ctx, next) => {
  console.log('come');

  ctx.append("Access-Control-Allow-Origin", "*");
  ctx.append("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
  ctx.append(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

app.use(business.routes())

app.listen(port, () => {
  console.log('running.....' + port);

})