/* eslint-disable semi */
import ChainService from '../src/services/chain-service.js';
import ipfsStore from '../test/helpers/ipfsStore.js';
const startIpfs = require('../scripts/helpers/start-ipfs.js');
const startGanache = require('../scripts/helpers/start-ganache.js');

import { expect } from 'chai';
import { v4 } from 'uuid';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';
const chalk = require('chalk')

// tests
before(async () => {
  
  if (process.env.NODE_ENV === 'local') {
    console.log(chalk`\n{bold.hex('#26d198') Starting Local IPFS }\n`)
    await startIpfs();
    console.log(chalk`\n{bold.hex('#26d198') Starting Local Blockchain }\n`)
    await startGanache();
  } else {
    console.log(chalk`\n{bold.hex('#6e3bea') Running 3rd Party Blockchain }\n`)
  }
  
});

describe('Create Identity Wallet', async () => {
  // setup
  // eslint-disable-next-line prefer-const
  let url = '';

  if (process.env.NODE_ENV === 'local') {
    url = 
`${process.env.CHAIN_API_PROTOCOL}://\
${process.env.CHAIN_API_DOMAIN}:\
${process.env.CHAIN_API_PORT}`;
  }else{
    url = 
`${process.env.CHAIN_API_PROTOCOL}://\
${process.env.INFURA_WEB3_NETWORK}.\
${process.env.CHAIN_API_DOMAIN}\
${process.env.INFURA_PROJECT_ID}`;
  }

  console.log(chalk`\n{bold.hex('#6e3bea') Connecting to ${url} }\n`)

  const web3Provider = new Web3.providers.HttpProvider(url);
  const web3 = new Web3(web3Provider);
  const chainService = new ChainService(
    {
      web3: web3,
      options: {
        pk: process.env.WALLET_PRIV_KEY,
      }
    });
  const expiry = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60; //24 hours
  
  // identity
  
  const token = v4();
  const deviceId = v4();

  // alias
  // eslint-disable-next-line prefer-const
  let alias = 'info@sing-inc.com'
  const burner = false;
  const nonce = false;

  // distributed data
  // eslint-disable-next-line prefer-const
  let profile = {};

  it('should register identity, create wallet and send to ipfs', async () => {
    const provider = new chainService.ethers.providers.JsonRpcProvider(
      url
    );
    
    const wallet = await chainService.createIdentity(process.env.INFURA_WEB3_NETWORK);
    console.log('wallet', wallet);

    profile.assets = [];

    profile.did = wallet.did;

    profile.address = wallet.address;

    profile.publicKey = wallet.publicKey;

    profile.token = token;

    profile.deviceId = deviceId;

    console.log('profile', profile);

    const store = await ipfsStore.setStore(profile);

    console.log('store', store);

    console.log('get store', await ipfsStore.getStore(store));

    const txSetIdentity = await chainService.setIdentity(
      wallet.address,
      store,
      provider
    );
    console.log('\n\ntxSetIdentity', txSetIdentity);

    const txRegistry = await chainService.setIdentityRegistry(
      wallet.address,
      provider
    );
    console.log('\n\ntxRegistry', txRegistry);
  });

  it('should create alias', async () => {
    const provider = await new chainService.ethers.providers.JsonRpcProvider(
      url
    );
    const wallet = await chainService.createIdentity(process.env.INFURA_WEB3_NETWORK);
    const txSetAlias = await chainService.setAlias(
      wallet.address,
      alias,
      burner,
      nonce,
      expiry,
      provider
    );
    console.log('\n\ntxSetAlias', txSetAlias);

    expect(txSetAlias).to.not.be.null;
  });

  it('should get aliases', async () => {
    //const txGetAlias = await chainService.getAlias(alias, provider)
    // console.log('txGetAlias', txGetAlias)
    const provider = await new chainService.ethers.providers.JsonRpcProvider(
      url
    );
    const wallet = await chainService.createIdentity(process.env.INFURA_WEB3_NETWORK);
    const txGetIdentity = await chainService.getIdentity(
      wallet.address,
      provider
    );
    // console.log('txGetIdentity', txGetIdentity) // index 1 contains array of encdoded aliases

    const aliases = [];
    for (const a of txGetIdentity[1]) {
      // console.log('a', a)

      const aliasItem = await chainService.getAlias(
        chainService.ethers.utils.formatBytes32String(a),
        provider
      );
      // console.log('aliasItem', aliasItem)
      aliases.push({
        active: aliasItem.active,
        alias: chainService.ethers.utils.formatBytes32String(a),
      });
    }
    // console.log('aliases', aliases)

    if (txGetIdentity) {
      const getStored = await ipfsStore.getStore(txGetIdentity[0]);
      const deciphertext = CryptoJS.AES.decrypt(
        getStored,
        wallet.privateKey
      ).toString(CryptoJS.enc.Utf8);
      console.log('\n\ngetStored', deciphertext);
    }

    expect(aliases).to.not.be.empty;
  });
});
