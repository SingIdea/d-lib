# d-protocol library

This library of Ethereum smart contracts which allow anyone to create decentralized P2P identities.

## Using in your project

### As a node package

```bash
npm install @d-protocol/d-lib --save
```

or

```bash
yarn add @d-protocol/d-lib
```

`yarn build` will generate this file and save it to `dist/d-lib.js`

### Local development

1. Clone this repo.

```bash
git clone <https://github.com/SingIdea/d-lib.git> && cd d-lib
```

2. Install dependencies and link

```bash
yarn run install:dev
```

`install:dev` is shortcut for `npm install && npm link`
Linking means that changes to the code are immediately available to local DApps without an npm install.

3. Start the local blockchain and build code

```bash
yarn start
```

Code changes will trigger a live rebuild.

## Tests

Command Line (All Tests)
Full test suite can be run with:

```bash
yarn run test
```

Note: you should not have the Ganache server running at this time, as these tests start their own local blockchain instance.

### Command Line (Only Solidity Tests)

Solidity tests (which use Truffle) are located at contracts/test.

```bash
yarn run test:contracts
```

Note: you should not have the server running at this time, as these tests start their own local blockchain instance.

### Browser Tests

A subset of our tests can be run from the browser. These tests are automatically served at <http://localhost:8081> when you run npm start. These tests are automatically rerun when source or test code is changed.

Run a subset of these tests using the grep query string parameter, for example: <http://localhost:8081/?grep=IpfsService>

Using the Ganache GUI
By default, starting code locally starts ganache-cli automatically.

However, for development you might want to connect to the GUI version of Ganache. This provides a nice interface for browsing your local blockchain activity and can be useful for debugging.

To use the Ganache GUI:

Install Ganache
Start Ganache
Navigate to the settings in Ganache (click on the gear in the upper right-hand corner)
Set Port Number to 8545
Set Network ID to 999

Under the Accounts & Keys tab, set the mnemonic to:
`candy maple cake sugar pudding cream honey rich smooth crumble sweet treat`

When starting code locally:

```bash
yarn run start
```

### Initialize a genesis node

geth --datadir . init ./genesis.json

geth --datadir . --networkid 9090 console

geth --datadir . import pk

Start a genesis node
geth --datadir . --networkid 999 --mine --minerthreads=4 --rpc --rpcapi "db,eth,net,web3,personal,admin" --rpccorsdomain "*" --rpcaddr "0.0.0.0"
