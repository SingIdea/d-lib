const ganache = require('ganache')

const PORT = 8545

const startGanache = () => {
  return new Promise((resolve, reject) => {
    const server = ganache.server({
      total_accounts: 6,
      default_balance_ether: 100,
      network_id: 999, //31337,
      // seed: 123,
      blocktime: 0,
      gasPrice: 0x01,
      gasLimit: 0xfffffffffff,
      // mnemonic: 'stereo jelly wise dwarf shock reveal youth jeans panther adapt state sheriff',
      mnemonic: 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
    })
    server.listen(PORT, err => {
      if (err) {
        return reject(err)
      }
      console.log(`Ganache listening on port ${PORT}`)
      resolve()
    })
  })
}

module.exports = startGanache
