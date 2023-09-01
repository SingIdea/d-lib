import IpfsService from '../../src/services/ipfs-service.js'

const auth = 'Basic ' + 
  Buffer.from(process.env.INFURA_IPFS_API_KEY + ':' + process.env.INFURA_IPFS_API_KEY_SECRET).toString('base64')

const ipfsService = new IpfsService({
  ipfsApiDomain: process.env.IPFS_API_DOMAIN,
  ipfsApiPort: process.env.IPFS_API_PORT,
  ipfsGatewayDomain: process.env.IPFS_GATEWAY_DOMAIN,
  ipfsGatewayPort: process.env.IPFS_GATEWAY_PORT,
  ipfsProtocol: process.env.IPFS_PROTOCOL,
  ipfsAuth: auth
})

const ipfsStore = {
  setStore: async (ipfsObj) => {
    const ipfsHash = await ipfsService.submitFile(ipfsObj)
    console.log('ipfsHash', ipfsHash)
    const ipfsBytes = await ipfsService.getBytes32FromIpfsHash(ipfsHash)
    console.log('ipfsBytes', ipfsBytes)
    return ipfsBytes
  },

  getStore: async (ipfsBytes) => {
    const ipfsHashFromBytes = ipfsService.getIpfsHashFromBytes32(ipfsBytes)
    console.log('ipfsHashFromBytes', ipfsHashFromBytes)
    const ipfsObj = await ipfsService.getFile(ipfsHashFromBytes)
    console.log('ipfsObj', ipfsObj)
    return ipfsObj
  },
}

export default ipfsStore
