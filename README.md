# Orbit Examples

Example uses of the OrbitDB document type database.

## Requirements
- Node.js
- npm
    - `ipfs` package
    - `orbit-db` package

## Walkthrough
If you don't have the npm packages yet, install them:
```
npm install ipfs orbit-db
```
Each file walks through the use of OrbitDB features with code commenting.

### Documents type database
`doc_db.js` systematically walks through the functions available for docs type databases. The script:
1. Sets up IPFS and OrbitDB
2. Creates a documents type database
3. Adds some documents representing people
4. Displays one of the documents
5. Filters the documents
6. Deletes documents based on filtered results
7. Displays the remaining database
8. Disconnects from OrbitDB and IPFS

To run, navigate to this folder in your terminal and type:
```
node doc_db.js
```

### Persistency between connections to IPFS/OrbitDB
`persistency.js` shows how to open an OrbitDB database saved to disk. It should be run after `doc_db.js`. The script:
1. Sets up a new instance of IPFS and OrbitDB
2. Loads the database created by `doc_db.js` from disk
3. Displays the database again
4. Disconnects from OrbitDB and IPFS

To run, as above type:
```
node persistency.js
```
