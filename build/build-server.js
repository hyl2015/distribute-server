// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var config = require('../config')

var spinner = ora('building server for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', config.build.serverAssetsRoot)
shell.mkdir('-p', config.build.serverAssetsRoot)
shell.exec('./node_modules/babel-cli/bin/babel.js server/src -d dist -q -D', function () {
  spinner.stop()
  console.log(chalk.cyan('  Build server complete.\n'))
})

