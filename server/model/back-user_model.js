const db = require('./DB.js')
// 声明一个自动从对象中获取插入数据参数的方法
const { coverImgName } = require('../router/manage-back')
async function getInsertParams (args, surface, back) {
  // 保存插入的数据
  console.log(coverImgName, 'coverImgNamewwwwww')
  let valueArr = Object.values(args)
  // 声明一个逗号字符串 保存相应长度的数据长度的字符串
  let commaStr = ''
  // 拿到插入数据的键值
  let keyStr = Object.keys(args).toLocaleString()
  // 根据数据的长度 拼接相应的逗号
  for (let i = 0; i < valueArr.length; i++) {
    commaStr += '?,'
  }
  // 删除最后一个逗号
  let lengths = commaStr.length - 1
  commaStr = commaStr.slice(0, lengths)
  let sql = `insert into ${surface}(${keyStr}) values(${commaStr})`
  let backd = await db.q(sql, valueArr)
  back(keyStr, commaStr, valueArr)
}
module.exports = {
  lookupUser: async (args) => {
    let sql = `select * from back_user where account = ?`
    let arr = Object.values(args)
    if (arr.length > 1) {
      sql = `select * from back_user where account = ? and password`
    }
    return await db.q(sql, arr)
  },
  insertPeo: async (args) => await db.q(`insert into back_user(account,password) values(?,?)`, Object.values(args)),
  saveBookSesson: async (args) => {
    // console.log(args)

    getInsertParams(args, 'bookshelf', (...arg) => {
      console.log(arg)
      let { coverImgName } = require('../router/manage-back')
      console.log(coverImgName, 'coverImgName')
      if (coverImgName) {
        coverImgName.then(success => {
          console.log(success)

        }).catch(err => {
          console.log(err)

        })
      }
    })


  }
}