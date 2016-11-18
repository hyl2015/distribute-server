/**
 * Created by hyl on 2016/11/17.
 */
'use strict'

import Glue from 'glue'
import manifest from './src/config/manifest.json'

if (!process.env.PRODUCTION) {
    manifest.registrations.push({
        "plugin": {
            "register": "blipp",
            "options": {}
        }
    })
}

Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
        console.log('server.register err:', err)
    }
    server.start(() => {
        console.log('✅  Server is listening on ' + server.info.uri.toLowerCase())
    })
})