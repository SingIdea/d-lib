const chalk = require('chalk')
const startGanache = require('./helpers/start-ganache')
const testContracts = require('./helpers/test-contracts')
const buildContracts = require('./helpers/build-contracts')
const startIpfs = require('./helpers/start-ipfs')
const watch = require('node-watch')

let isRunning = false
let isEnqueued = false
const runTests = async () => {

  if (!isRunning) {
    isRunning = true

    console.log(chalk`\n{bold.hex('#6e3bea') Compiling Smart Contracts }\n`)
    await buildContracts()

    console.log(chalk`\n{bold.hex('#1a82ff') Testing Smart Contracts }\n`)
    await testContracts()

    isRunning = false
    if (isEnqueued) {
      isEnqueued = false
      runTests()
    }
  } else {
    isEnqueued = true
  }

}

const start = async () => {

  if (process.env.NODE_ENV === 'local') {
    console.log(chalk`\n{bold.hex('#26d198') Starting Local Blockchain }\n`)
    await startGanache()
  
    console.log(chalk`\n{bold.hex('#1a82ff') Starting Local IPFS }\n`)
    await startIpfs()
  }

  runTests()

  // watch contracts
  watch(
    ['./contracts/contracts'],
    { recursive: true },
    async (evt, name) => {
      console.log('%s changed.', name)
      runTests()
    }
  )

}

start()