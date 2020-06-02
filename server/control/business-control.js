const fs = require('fs')
const path = require('path')
const util = require('util')
const getReqData = require('../js/getReqData')
module.exports = {
  index: async (ctx, next) => {
    imgUrl = ctx.query.url
    // console.log('login')

    // console.log(fs.readFileSync(path.resolve(__dirname, `../static/images/${imgUrl}`)), 'login')

    ctx.body = fs.readFileSync(path.resolve(__dirname, `../static/images/${imgUrl}`))


  }
}