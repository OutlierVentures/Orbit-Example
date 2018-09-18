//////////////////////////////////////////////////////////////
// OrbitDB setup
//////////////////////////////////////////////////////////////

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// Pubsub option must be passed to all components
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

// Create OrbitDB instance on IPFS instance
const ipfs = new IPFS(ipfsOptions)
ipfs.on('ready', () => {
  const orbitdb = new OrbitDB(ipfs)
})
