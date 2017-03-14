/**
 * Created by hyl on 2017/3/14.
 */
import Glue from 'glue'
import manifest from './config/manifest-prod.json'
import schema from './graphql/schema'
import {HTTP_ERROR} from './common/http-constants'
var path = require('path')

manifest.registrations.push(
  {
    plugin: {
      register: './plugins/bootstrap'
    }
  },
  {
    plugin: {
      register: './plugins/graphql',
      options: {
        path: '/api/graphql',
        graphqlOptions: (request) => {
          return {
            schema,
            context: {request},
            formatError: (error) => {
              console.error(error.message)
              return error.originalError || new Error(error.message)
            },
            formatResponse: (response, options) => {
              if (response.errors && response.errors.length > 0) {
                delete response.data
              } else {
                response.code = HTTP_ERROR.SUCCESS.code
              }
              return response
            }
          }
        }
      }
    }
  })

Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    console.log('server.register err:', err)
  }
  
  server.route({
    path: '/{path*}',
    method: 'GET',
    config: {
      auth: false,
      handler: {file: './assets/index.html'}
    }
  })
  
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: './assets/static/',
        redirectToSlash: true,
        index: false
      }
    }
  })
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase())
  })
})
