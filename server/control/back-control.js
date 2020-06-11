const backUserModel = require('../model/back-user_model')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
// 引入获取请求参数的方法
const getReqDatae = require('../js/getReqData')
module.exports = {
  login: async (ctx, next) => {
    console.log('login')

    let reqData = ctx.request.body
    let res = await backUserModel.lookupUser(reqData)
    console.log(res.length, 'l')

    if (res.length) {
      ctx.body = { code: '001', msg: '登录成功' }
      ctx.session.user = res[0]
    } else {
      console.log(res, 'res')
      ctx.body = { code: '002', msg: '账户或密码错误' }
    }
  },
  register: async (ctx, next) => {
    let params = ctx.request.body
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
  // 添加书籍相关文件
  addFunc: async (ctx, next) => {
    let obj = ctx.req.body
    let bookSesson = await backUserModel.saveBookSesson(obj ? obj : '', 'file')
    if (bookSesson) {
      ctx.body = {
        code: '001',
        data: bookSesson
      }
    } else {
      ctx.body = {
        code: '002',
        msg: '书籍信息插入失败！'
      }
    }
  },
  addBookParams: async (ctx, next) => {
    let reqData = ctx.request.body
    console.log(reqData, 'fgdfgt')

    let bookSesson = await backUserModel.saveBookSesson(reqData, 'unfile')
    if (bookSesson) {
      ctx.body = {
        code: '001',
        data: bookSesson
      }
    } else {
      ctx.body = {
        code: '002',
        msg: '书籍信息插入失败！'
      }
    }
  },
  // 新增书籍分类 参数 type 1 男频 2 女频 3不限 classification 分类信息
  ClassificationSet: async (ctx, next) => {
    let reqData = ctx.request.body
    let backSes = await backUserModel.setClassification(reqData)

    if (backSes.affectedRows === 1) {
      ctx.body = {
        msg: '新增成功',
        code: '001',
        data: await backUserModel.selectClassioficationByType(reqData.gender_type)
      }
    } else {
      ctx.body = {
        msg: '新增失败',
        code: '002'
      }
    }
  },
  // 返回书籍的分类信息
  ClassioficationGet: async (ctx, next) => {
    let gender_type = ctx.query.gender_type
    if (!gender_type) {
      ctx.body = {
        msg: '请选择搜索条件',
        code: '002'
      }
      return
    }
    let backSes = await backUserModel.selectClassioficationByType(gender_type)
    ctx.body = {
      data: backSes,
      code: '001'
    }
  },
  // 更新书籍分类信息
  classificationupdate: async (ctx, next) => {
    let reqData = ctx.request.body
    let backMes = await backUserModel.updateClassification(reqData)
    if (backMes.affectedRows === 1) {
      ctx.body = {
        msg: '更新成功',
        code: '001'
      }
    } else {
      ctx.body = {
        msg: '修改失败！请稍后重试',
        code: '002'
      }
    }
  },
  // 删除分类信息
  delClassification: async (ctx, next) => {
    let reqData = ctx.request.query

    if (reqData.id) {
      let backMsg = await backUserModel.delClassification(reqData.id)
      if (backMsg.affectedRows === 1) {
        ctx.body = {
          msg: '分类删除成功',
          code: '001'
        }
      } else {
        ctx.code = {
          msg: '删除失败！请稍后重试！',
          code: '002'
        }
      }
    } else {
      ctx.body = {
        msg: '参数异常',
        code: '002'
      }
    }

  },

}