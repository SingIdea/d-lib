/**
 * Start a long-running test environment.
 * Useful when running mocha tests in watch mode
 */

const chalk = require('chalk')
const startGanache = require('./helpers/start-ganache')
const deployContracts = require('./helpers/deploy-contracts')
const startIpfs = require('./helpers/start-ipfs')

const start = async () => {
  try {
    if (process.env.NODE_ENV === 'local') {
      console.log(chalk`\n{bold.hex('#26d198') Starting Local IPFS }\n`)
      await startIpfs()
      console.log(chalk`\n{bold.hex('#26d198') Starting Local Blockchain }\n`)
      await startGanache()
    }
    console.log(chalk`\n{bold.hex('#6e3bea') Deploying Smart Contracts }\n`)
    await deployContracts(process.env.INFURA_WEB3_NETWORK)
  } catch (error) {
    console.log(chalk`\n{bold ⚠️  Env failed. }\n`)
    console.error('test-env error', error)
  }
}

start()
