#!/usr/bin/env node

const Koa = require('koa')
const app = new Koa()
const {
  port
} = require('./config/app.config')

require('./middleware/favicon')(app)
require('./middleware/webpack')(app)
require('./middleware/sass')(app)
require('./middleware/static')(app)


app.listen(port, () => {
  console.log('http://127.0.0.1:' + port)
})