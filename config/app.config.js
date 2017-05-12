const {
  resolve
} = require('path')

let localConfig = {}

try {
  localConfig = require(resolve('./app.config.js'))
} catch (error) {}


module.exports = Object.assign({
  port: 1337,
  static: resolve('./static/'),
  favicon: resolve('./static/favicon.ico'),
  sass: {
    src: resolve('./static/sass'),
    dist: resolve('./static/css'),
    includePaths: [resolve('./static/sass')],
    sourceMap: true
  }
}, localConfig)