const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.CHAIN_API_MNEMONIC
const PROJECT_ID = process.env.INFURA_PROJECT_ID
const CHAIN_NETWORK = process.env.INFURA_WEB3_NETWORK
const CHAIN_DOMAIN = process.env.CHAIN_API_DOMAIN
const CHAIN_PROTOCOL = process.env.CHAIN_API_PROTOCOL
const CHAIN_PORT = process.env.CHAIN_API_PORT
const chainId = process.env.CHAIN_NETWORK_ID

// Truffle setup
const truffleSetup = {
  migrations_directory: './migrations',
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      onlyCalledMethods: true
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    ganache: {
      provider: () => {
        return new HDWalletProvider(mnemonic, `${CHAIN_PROTOCOL}://${CHAIN_DOMAIN}:${CHAIN_PORT}}`)
      },
      network_id: '*'
    },
    //Infura
    CHAIN_NETWORK: {
      provider: () => {
        return new HDWalletProvider(mnemonic, `${CHAIN_PROTOCOL}://${CHAIN_NETWORK}.${CHAIN_DOMAIN}${PROJECT_ID}`)
      },
      network_id: chainId,
    }
  },
  compilers: {
    solc: {
      version: '0.4.23',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: 'PQ83YGQG8YE4GZMMQ52D8SRF7ECRSX28HP'
  },
}

module.exports = truffleSetup