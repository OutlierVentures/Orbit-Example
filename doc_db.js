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

// Create IPFS instance and pass the pubsub option in.
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', () => {

    // Create OrbitDB instance on the IPFS instance
    const orbitdb = new OrbitDB(ipfs)

    // Create our docs type database using index-by-name option
    const db = await orbitdb.docs('docdb', { indexBy: 'name' })

    // Log the database address so it can be replicated
    console.log(db.address.toString())

})
