// Set up a new docs type OrbitDB database

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

    // Create our docs type database using index-by-name option
    const db = await orbitdb.docs('doc_db', { indexBy: 'name' })

    // Log the database address so it can be replicated
    console.log("We are go! The database address is:\n"
                + db.address.toString())

    // Add three documents, e.g. representing people
    await db.put({ _id: 'ID1', name: 'Alice', age: 17 })
    await db.put({ _id: 'ID2', name: 'Bob', age: 18 })
    await db.put({ _id: 'ID3', name: 'Carol', age: 19 })
    console.log("3 users have been added to the database.")

    // Get all docs by regex filter
    console.log("All people with an 'o' in their name.")
    const oPeople = db.query((doc) => doc.name.match(/o/))
    for (i = 0; i < oPeople.length; i++) {
        let oPerson = oPeople[i];
        console.log(oPerson);
    }

    // Get a doc
    console.log("Alice's file looks like this:")
    const profile = db.get('Alice')
    console.log(profile)

    // Filter docs
    console.log("Let's get rid of under 18s.")
    const youngsters = db.query((doc) => doc.age < 18)
    for (i = 0; i < youngsters.length; i++) {
        let youngster = youngsters[i].name
        await db.del(youngster)
        console.log(youngster + " has been removed.")
    }

    // Show entire database with tautology mapper
    // Query returns a JSON array so use separate log statement
    console.log("Remaining files in the database:")
    console.log(db.query((doc) => doc))

    // Disconnect
    await orbitdb.disconnect()
    ipfs.stop(() => {})
    console.log("Disconnected from OrbitDB and IPFS!")

})
