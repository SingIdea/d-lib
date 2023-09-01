const { spawn } = require('child_process')
const minifyContracts = require('./minify-contracts')
const network = process.env.INFURA_WEB3_NETWORK || 'sepolia'

const buildContracts = () => {
  return new Promise((resolve, reject) => {
    const truffleCompile = spawn('..\\node_modules\\.bin\\truffle.cmd', ['compile', '--network'+network], {
      cwd: './contracts'
    })
    truffleCompile.stdout.pipe(process.stdout)
    truffleCompile.stderr.on('data', data => {
      reject(String(data))
    })
    truffleCompile.on('exit', code => {
      if (code === 0) {
        console.log('Truffle compile finished OK.')
      }
      minifyContracts()
      resolve()
    })
  }).catch(err => { console.log('Truffle build error: ', err) })
}

module.exports = buildContracts
