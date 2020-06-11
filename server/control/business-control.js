const fs = require('fs')
const path = require('path')
const util = require('util')
const getReqData = require('../js/getReqData')
const back_business = require('../model/back_business')
module.exports = {
  // 书架第一次进来的男频 女频图片 参数为图片名称 male famale
  index: async (ctx, next) => {
    imgUrl = ctx.query.url
    ctx.body = fs.readFileSync(path.resolve(__dirname, `../static/images/${imgUrl}`))
  },
  getBooksesson: async (ctx, next) => {
    let query = ctx.query
    let backUrl = await back_business.getBooksesson(query)
    console.log(backUrl)

  }
}