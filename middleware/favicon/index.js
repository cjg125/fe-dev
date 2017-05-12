const middleware = require('koa-favicon')

const {
  favicon
} = require('../../config/app.config')

module.exports = function (app) {
  app.use(middleware(favicon))
}