/**
 * Created by hyl on 2016/11/17.
 */
'use strict'

import Glue from 'glue'
import manifest from './src/config/manifest.json'
import baseModel from './src/orm/baseModel'

if (!process.env.PRODUCTION) {
    manifest.registrations.push({
        plugin: {
            register: 'blipp',
            options: {}
        }
    })
}

manifest.registrations.push({
    plugin: {
        register: 'hapi-bookshelf-models',
        options: {
            knex: {
                client: 'mysql',
                connection: {
                    host: 'localhost',
                    user: 'root',
                    password: '123456',
                    database: 'publish_server',
                    port: 3306
                }
            },
            plugins: [
                'registry',
                'bookshelf-camelcase'
            ],
            models: './src/orm/models',
            collections: './src/orm/collections',
            base: baseModel
        }
    }
})
// 5850105751099

Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
        console.log('server.register err:', err)

    }
    //request中增加model方法，方便调用
    server.ext('onRequest', function (request, reply) {
        request.model = server.plugins.bookshelf.model.bind(server.plugins.bookshelf)
        return reply.continue()
    })

    server.start(() => {
        console.log('✅  Server is listening on ' + server.info.uri.toLowerCase())
    })
})