const webpack = require('webpack')

const {
  join,
  resolve
} = require('path')

const {
  static
} = require('./app.config')

let localConfig = {}


try {
  localConfig = require(resolve('./webpack.config.js'))
} catch (error) {}


let env = join(__dirname, '..', 'node_modules', 'babel-preset-env')

module.exports = Object.assign({
  entry: {
    common: [
      'jquery',
      'cookie',
      'tmpl'
    ],
    index: [join(static, 'js', 'index')]
  },
  output: {
    path: '/build/js',
    filename: '[name].js',
    publicPath: '/js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity
    })
  ],
  resolve: {
    modules: [join(static, 'js'), join(__dirname, '..', 'node_modules'), 'node_modules'],
    alias: {
      tmpl: "blueimp-tmpl",
      cookie: "js-cookie"
    }
  },
  resolveLoader: {
    modules: [join(__dirname, '..', 'node_modules'), "node_modules"],
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|common)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [env, {
                loose: true,
                modules: false
              }]
            ],
            plugins: []
          }
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "raw-loader"
        }]
      }, {
        test: /\.json/,
        use: [{
          loader: "json-loader"
        }]
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          query: 'jQuery'
        }, {
          loader: 'expose-loader',
          query: '$'
        }]
      }, {
        test: require.resolve('js-cookie'),
        use: [{
          loader: 'expose-loader',
          query: 'Cookie'
        }]
      }
    ]
  }
}, localConfig)

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = '#source-map'
}