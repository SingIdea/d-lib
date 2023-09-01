const { spawn } = require('child_process')

const runMocha = () => {
  return new Promise((resolve, reject) => {
    const mocha = spawn('node_modules\\.bin\\_mocha.cmd', [
      '-r',
      '@babel/register',
      '-r',
      '@babel/polyfill',
      '--no-deprecation',
      '--timeout',
      '600000',
    ])
    mocha.stdout.pipe(process.stdout)
    mocha.stderr.pipe(process.stderr)

    mocha.on('exit', (code) => {
      if (code !== 0) {
        return reject()
      }
      resolve()
    })
    
  }).catch((err) => {
    console.log('Mocha error: ', err)
  })
}

module.exports = runMocha
