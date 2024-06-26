const { spawn } = require('child_process')

// Serve webpack dev server for browser testing
const startTestServer = () => {
  console.log('Serving tests from http://localhost:8081')
  const webpackDevServer = spawn('npm.com','./node_modules/.bin/webpack-dev-server', [
    '--hot',
    '--config',
    'test/webpack.config.js',
    '--host',
    '0.0.0.0'
  ])
  webpackDevServer.stderr.pipe(process.stderr)
}

module.exports = startTestServer
