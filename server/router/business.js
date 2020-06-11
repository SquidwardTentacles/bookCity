const Router = require('koa-router')
const router = new Router()
const control = require('../control/business-control')

router.get('/api', control.index)
  .get('/api/business/get-booksesson', control.getBooksesson)

module.exports = router