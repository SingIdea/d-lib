const { spawn } = require('child_process')
const minifyContracts = require('./minify-contracts')

const deployContracts = (network) => {
  return new Promise((resolve, reject) => {
    const truffleMigrate = spawn(
      '..\\node_modules\\.bin\\truffle.cmd',
      ['migrate', '--reset', '--compile-all', '--network'+network],
      { cwd: './contracts' }
    )
    truffleMigrate.stdout.pipe(process.stdout)
    truffleMigrate.stderr.on('data', data => {
      reject(String(data))
    })
    truffleMigrate.on('exit', code => {
      if (code === 0) {
        console.log('Truffle migrate finished OK.')
      }
      minifyContracts()
      resolve()
    })
  }).catch(err => { console.log('Truffle deploy error: ', err) })
}

module.exports = deployContracts
