const db = require('./DB.js')
// 声明一个自动从对象中获取插入数据参数的方法 arg数据对象 surface操作的表名 back 插入成功失败的回调函数
async function uploadFilefunc (args, surface, back) {
  // if (args) {
  //   // 保存插入的数据
  //   valueArr = Object.values(args)
  //   // 声明一个逗号字符串 保存相应长度的数据长度的字符串
  //   commaStr = ''
  //   // 拿到插入数据的键值
  //   keyStr = Object.keys(args).toLocaleString()
  //   // 根据数据的长度 拼接相应的逗号
  //   for (let i = 0; i < valueArr.length; i++) {
  //     commaStr += '?,'
  //   }
  //   // 删除最后一个逗号
  //   let lengths = commaStr.length - 1
  //   commaStr = commaStr.slice(0, lengths)
  // }

  // 拿到文件相关信息
  let { fileSesson } = require('../router/manage-back')
  let sql = ''
  // 如果有insertid就是新增内容 否则就是新插入数据
  let operationType = ''
  if (args && args.insertId) {
    sql = `update ${surface} set ${fileSesson.fileType} = '${fileSesson.fileName}' where id = ${args.insertId}`
    operationType = 'u'
  } else {
    operationType = 'i'
    sql = `insert into ${surface}(${fileSesson.fileType}) values(?)`
  }
  let sqlData = []
  if (operationType === 'i') {
    sqlData = [fileSesson.fileName]
  }
  // 将操作结果返回
  let backd = await db.q(sql, sqlData)
  let backobj = {}
  if (backd.affectedRows === 1) {
    backobj.insertId = backd.insertId
  }
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
    await uploadFilefunc(args, 'bookshelf', (back) => {
      if (back) {
        obj = back
      } else {
        obj = {}
      }
    })
    return obj
  },
  // 书籍分类的新增
  setClassification: async (args) => await db.q(`insert into classification_list(${Object.keys(args)}) values(?,?)`, Object.values(args)),
  // 根据书籍的分类返回对应的详细分类
  selectClassioficationByType: async (type) => await db.q(`select * from classification_list where gender_type = ?`, [type])
}