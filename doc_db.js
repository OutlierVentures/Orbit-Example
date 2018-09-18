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

ipfs.on('ready', async () => {

    // Create OrbitDB instance on the IPFS instance
    const orbitdb = new OrbitDB(ipfs)

    // Create our docs type database using index-by-name option
    const db = await orbitdb.docs('doc_db', { indexBy: 'name' })

    // Log the database address so it can be replicated
    console.log(db.address.toString())

    // Add three documents, e.g. representing people
    await db.put({ _id: 'ID1', name: 'Alice', age: 16 })
    await db.put({ _id: 'ID2', name: 'Bob', age: 17 })
    await db.put({ _id: 'ID3', name: 'Carol', age: 18 })


    // Filter docs
    const youngsters = db.query((doc) => doc.age < 18)

    for (i = 0; i < youngsters.length; i++) {
        console.log(youngsters[i].name + " is underage!")
    }

})
