const Router = require('koa-router')
const router = new Router()
let backControl = require('../control/back-control')
const path = require('path')

let coverImgName = '888888888888888888888888888888888888'
// 参数 * 为必传字段

const multer = require('koa-multer')//加载koa-multer模块  
var storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../file/txt'))
  },
  //修改文件名称  
  filename: function (req, file, cb) {
    // 原始文件名
    var fileFormat = (file.originalname).split(".")

    // 拿到文件名称
    let fileName = Date.now() + "." + fileFormat[fileFormat.length - 1]
    coverImgName = fileName
    // 导出文件名
    module.exports.coverImgName = coverImgName
    cb(null, fileName)
  }
})
//加载配置  
var upload = multer({ storage: storage })

router.post('/back/login', backControl.login)
  .post('/back/register', backControl.register)
  /**
   * 上传文件
   {
     书籍名称
     *  title: '',
     适合阅读的人群 1男 2女
     *  gender_ype: '',
     封面图片地址
     cover: '',
     文本文件地址
     *  txt_file: '',
     收费标准(1:收费 ，2：收费，3：限免，4：章节免费)不传则免费
     charge: '',
       书籍价格 不传免费
       price: '',
       描述
       describe: ''
      }
      */
  .post('/back/book-add', upload.single('file'), backControl.bookAdd.addFunc)

module.exports.router = router
// module.exports =