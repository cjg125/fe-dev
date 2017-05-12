const middleware = require('koa-static')
const {
  static
} = require('../../config/app.config')

module.exports = function (app) {
  app.use(middleware(static))
}