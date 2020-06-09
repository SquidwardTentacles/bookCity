const db = require('./DB.js')
// 声明一个自动从对象中获取插入数据参数的方法 arg数据对象 surface操作的表名 back 插入成功失败的回调函数
async function uploadFilefunc (args, surface, back, type) {
  console.log(type, 'filetype')
  // 拿到文件相关信息
  let { fileSesson } = require('../router/manage-back')
  let sql = ''
  // 如果是写入文件的请求
  let keyArr = ''
  let valueArr = ''

  // 将一些需要number格式的字段进行格式转换
  args.gender_type ? args.gender_type = parseInt(args.gender_type) : ''
  args.classification ? args.classification = parseInt(args.classification) : ''
  args.price ? args.price = parseInt(args.price) : ''
  // 在进行操作数据之前先配置好需要的相关数据
  let insertId = ''
  if (args.insertId) {
    insertId = args.insertId
    delete args.insertId
  }
  if (type === 'file') {
    keyArr = [fileSesson.fileType]
    valueArr = [insertId ? fileSesson.fileName : '\'' + fileSesson.fileName + '\'']
  } else {
    console.log(args, 'as')
    keyArr = Object.keys(args)
    valueArr = Object.values(args)
  }

  // 将相关字段添加引号后进入sql语句
  if (keyArr.length > 1) {
    console.log(valueArr, 'sr')
    for (let i = 0; i < valueArr.length; i++) {
      if (typeof valueArr[i] === 'string') {
        valueArr[i] = '\'' + valueArr[i] + '\''
      }
    }
  }
  // 如果有insertid就是新增内容 否则就是新插入数据
  let operationType = ''
  if (insertId) {
    let updateStr = ''
    if (keyArr.length > 1) {
      for (let i = 0; i < keyArr.length; i++) {
        updateStr += `${keyArr[i]}=${valueArr[i]},`
      }
      updateStr = updateStr.slice(0, updateStr.length - 1)
    } else {
      updateStr = `${keyArr} = '${valueArr}'`
    }
    sql = `update ${surface} set ${updateStr} where id = ${insertId}`
    operationType = 'u'
  } else {
    operationType = 'i'
    sql = `insert into ${surface}(${keyArr}) values(${valueArr})`
  }
  console.log(operationType, 'operationType')
  console.log(sql, 'sql')

  // 将操作结果返回
  let backd = await db.q(sql, [])
  if (operationType === 'u') {
    backd.insertId = insertId
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
  // 插入书籍或者相关数据
  saveBookSesson: async (args, type) => {
    let obj = {}
    await uploadFilefunc(args, 'bookshelf', (back) => {
      if (back) {
        obj = back
      } else {
        obj = {}
      }
    }, type)
    return obj
  },
  // 书籍分类的新增
  setClassification: async (args) => await db.q(`insert into classification_list(${Object.keys(args)}) values(?,?)`, Object.values(args)),
  // 根据书籍的分类返回对应的详细分类
  selectClassioficationByType: async (type) => await db.q(`select * from classification_list where gender_type = ?`, [type]),
  // 更新书籍分类信息
  updateClassification: async (args) => await db.q(`update classification_list set classification='${args.classification}' where id = ${args.id}`, []),
  // 删除书籍分类
  delClassification: async (id) => db.q(`delete from classification_list where id=${id}`)
}