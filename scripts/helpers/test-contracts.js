const { spawn } = require('child_process')
const network = process.env.INFURA_WEB3_NETWORK || 'sepolia'

// When run with no arguments, this script runs all contract tests. It
// optionally takes a single argument that specifies the path of a single
// contract test to run. That path is relative to 'contracts/test'.
const testContracts = () => {
  return new Promise((resolve, reject) => {
    const testFile = process.argv[2]
    let truffleArgs
    if (testFile === undefined) {
      truffleArgs = ['test', '--compile-all', '--network'+network, '--debug']
    }
    else {
      console.log('running ' + testFile)
      truffleArgs = ['test', 'test/'+testFile, '--compile-all', '--network'+network, '--debug']
    }
    const truffleTest = spawn(
      '..\\node_modules\\.bin\\truffle.cmd',
      truffleArgs,
      { cwd: './contracts' }
    )
    truffleTest.stdout.pipe(process.stdout)
    truffleTest.stderr.on('data', data => {
      reject(String(data))
    })
    truffleTest.on('exit', (code) => {
      if (code !== 0) {
        return reject()
      }
      console.log(`Truffle Contract Test finished OK.`)
      resolve()
    })
  }).catch(err => { console.log(`Truffle Test Error: ${err}`) })
}

module.exports = testContracts