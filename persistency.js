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

ipfs.on('ready', async () => {

    // Create OrbitDB instance on the IPFS instance
    const orbitdb = new OrbitDB(ipfs)

    const db = await orbitdb.open('/orbitdb/Qmc95aEEVfR4T64fJZRSXK34gULCN9Nvfwim8oBAW2XbFs/doc_db')
    await db.load()
    console.log(db.query((doc) => doc))

})
