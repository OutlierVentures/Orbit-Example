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
console.log("IPFS is up and running.")

// Handle errors
ipfs.on('error', (e) => console.error(e))

// Start working with OrbitDB once the IPFS instance is ready
ipfs.on('ready', async () => {

    // Create OrbitDB instance on the IPFS instance
    const orbitdb = new OrbitDB(ipfs)
    console.log("OrbitDB is up and running.")

    // Open and load the database created in doc_db.js
    const db = await orbitdb.open('/orbitdb/Qmc95aEEVfR4T64fJZRSXK34gULCN9Nvfwim8oBAW2XbFs/doc_db')
    await db.load()

    console.log("Here's that database again:")
    console.log(db.query((doc) => doc))

    // Disconnect
    await orbitdb.disconnect()
    ipfs.stop(() => {})
    console.log("Disconnected from OrbitDB and IPFS.")

})
