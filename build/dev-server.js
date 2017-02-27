require('./check-versions')()
import config from '../config'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from './webpack.dev.conf'
import Glue from 'glue'
import manifest from '../server/src/config/manifest.json'
import schema from '../server/src/graphql/schema'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const port = process.env.PORT || config.dev.port
const compiler = webpack(webpackConfig)


if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
      options: {}
    }
  })
}

manifest.registrations.push(
  {
    plugin: {
      register: '../server/src/plugins/graphql',
      options: {
        path: '/api/graphql',
        graphqlOptions: {
          schema
        }
      }
    }
  })

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  port,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    console.log('server.register err:', err)
  }
  
  server.ext('onRequest', (request, reply) => {
    if (request.path.indexOf('/api') === 0) {
      return reply.continue()
    }
    devMiddleware(request.raw.req, request.raw.res, (devError) => {
      if (devError) {
        return reply(devError)
      }
      return reply.continue()
    })
  })
  
  server.ext('onRequest', (request, reply) => {
    if (request.path.indexOf('/api') === 0) {
      return reply.continue()
    }
    hotMiddleware(request.raw.req, request.raw.res, (err) => {
      if (err) {
        return reply(err)
      }
      return reply.continue()
    })
  })
  
  server.ext('onPreResponse', (request, reply) => {
    if (request.path.indexOf('/api') === 0) {
      return reply.continue()
    }
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (fileReadErr, result) => {
      if (fileReadErr) {
        return reply(fileReadErr)
      }
      reply(result).type('text/html')
    })
  })
  
  //request中增加model方法，方便调用
  server.ext('onRequest', function (request, reply) {
    if (request.path.indexOf('/api') < 0) {
      return reply.continue()
    }
    // request.model = server.plugins.bookshelf.model.bind(server.plugins.bookshelf)
    return reply.continue()
  })
  
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase())
  })
})
