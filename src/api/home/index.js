/**
 * Created by Hyl on 2016/11/17.
 */


import Build from '../../../scripts/Build'


export const hello = {
    handler: function (request, reply) {
        const build = new Build({
            platform: Build.PLATFORMS.IOS,
            inPath: '/Users/linlin.huang/Documents/workspace/rn/lifeline',
            entryFile: 'index.ios.js',
            outPath: '/Users/linlin.huang/Desktop/out',
            version: request.params.version,
            preVersion: 1
        })

        build.start()

        return reply({result: 'Hello hapi!'})
    }
}

export const restricted = {
    auth: 'jwt',
    handler: function (request, reply) {
        return reply({result: 'Restricted!'})
    }
}

export const notFound = {
    handler: function (request, reply) {
        return reply({result: 'Oops, 404 Page!'}).code(404)
    }
}