const backUserModel = require('../model/back-user_model')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
let manageBack = require('../router/manage-back')
console.log(manageBack.filenameM, 'sss')

// 引入获取请求参数的方法
const getReqDatae = require('../js/getReqData')
module.exports = {
  login: async (ctx, next) => {
    let reqData = await getReqDatae(ctx)
    let res = await backUserModel.lookupUser(reqData)
    if (res.length) {
      ctx.body = { code: '001', msg: '登录成功' }
      ctx.session.user = res[0]
    } else {
      ctx.body = { code: '002', msg: '账户或密码错误' }
    }
  },
  register: async (ctx, next) => {
    let params = await getReqDatae(ctx)
    if (!params || !params.account) {
      ctx.body = { code: '002', msg: '请填写用户名、密码' }
      return
    }
    let res = await backUserModel.lookupUser({ account: params.account })
    if (!res.length) {
      // 没有找到用户名 可以注册 
      let insertRes = await backUserModel.insertPeo(params)
      if (insertRes.affectedRows === 1) {
        ctx.body = { code: '001', msg: '注册成功' }
      } else {
        ctx.body = { code: '002', msg: '注册失败' }

      }

    } else {
      console.log('body')
      ctx.body = {
        code: 002, msg: '当前账户已存在'
      }
    }
  },
  txtCoverName: 'txtCoverNameffffff',
  bookAdd: {
    addFunc: async (ctx, next) => {
      console.log(this, 'this')

      let obj = ctx.req.body
      console.log(manageBack.filenameM, 'txtCoverName')

      obj.gender_type = 1
      obj.price = parseFloat(obj.price)
      obj.charge = parseFloat(obj.charge)
      // console.log(obj)

      let bookSesson = backUserModel.saveBookSesson(obj)
    }, txtCoverName: 'txtCoverName'
  }
}