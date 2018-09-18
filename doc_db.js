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

// Initialise OrbitDB instance on IPFS instance and create our
// documents type database. We use the index-by-name option.
// Don't forget we must pass the pubsub option in.
const ipfs = new IPFS(ipfsOptions)
ipfs.on('ready', () => {
  const orbitdb = new OrbitDB(ipfs)
  const db = await orbitdb.docs('docdb', { indexBy: 'name' })
})
