/**
 * Created by hyl on 2016/11/17.
 */
'use strict'

import Hapi from 'hapi'

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
    host: 'localhost',
    port: 8081
})

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        return reply('hello world')
    }
})

// Start the server
server.start((err) => {

    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})