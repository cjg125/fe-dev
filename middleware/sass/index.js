const sass = require('node-sass')
const fse = require('fs-extra')
const {
  parse,
  join
} = require('path')

let {
  src,
  dist,
  includePaths,
  sourceMap
} = require('../../config/app.config').sass

function render(name) {
  let file = join(src, name + '.scss')
  let outFile = join(dist, name + '.css')
  return new Promise((resolve, reject) => {
    sass.render({
      file,
      outFile,
      sourceMap,
      includePaths
    }, (error, result) => {
      if (error) {
        console.error(error)
        return resolve()
      }

      let all = [
        fse.outputFile(outFile, result.css)
      ]

      if (sourceMap) {
        all.push(fse.outputFile(outFile + '.map', result.map))
      }

      Promise.all(all).then(() => resolve())
    })
  })
}

module.exports = function (app) {
  app.use(async(ctx, next) => {
    let path = ctx.path
    if (!/\.css$/.test(path)) {
      return await next()
    }
    await render(parse(path).name)
    await next()
  })
}