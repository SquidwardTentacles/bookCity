const db = require('./DB.js')
// 声明一个自动从对象中获取插入数据参数的方法
async function getInsertParams (args, surface, back) {
  let valueArr = Object.values(args)
  valueArr.push('')
  let commaStr = ''
  let keyStr = Object.keys(args).toLocaleString()
  for (let i = 0; i < valueArr.length; i++) {
    commaStr += '?,'
  }
  // 删除最后一个逗号
  let lengths = commaStr.length - 1
  commaStr = commaStr.slice(0, lengths)
  let sql = `insert into ${surface} values(${commaStr})`
  // console.log(sql, valueArr)
  let backd = await db.q(sql, valueArr)
  // console.log(backd)

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
      // console.log(arg)

    })


  }
}