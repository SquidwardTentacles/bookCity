const db = require('./DB.js')
// 声明一个自动从对象中获取插入数据参数的方法 arg数据对象 surface操作的表名 back 插入成功失败的回调函数
async function getInsertParams (args, surface, back) {
  // 保存插入的数据
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
  back(backd)
}
module.exports = {
  // 查找用户是否存在
  lookupUser: async (args) => {
    let sql = `select * from back_user where account = ?`
    let arr = Object.values(args)
    if (arr.length > 1) {
      sql = `select * from back_user where account = ? and password`
    }
    return await db.q(sql, arr)
  },
  // 注册加入数据库人员注册信息
  insertPeo: async (args) => await db.q(`insert into back_user(account,password) values(?,?)`, Object.values(args)),
  // 插入书籍
  saveBookSesson: async (args) => {
    let obj = {}
    await getInsertParams(args, 'bookshelf', (back) => {
      if (back && back.affectedRows) {
        obj = {
          code: '001',
          msg: '书籍添加成功'
        }
      } else {
        obj = {
          code: '002',
          msg: '书籍添加失败！请检查后重试'
        }
      }
    })
    return obj
  }
}