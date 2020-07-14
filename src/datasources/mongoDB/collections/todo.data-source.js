const { MongoClient } = require('mongodb')

const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

/**
 * Get the DataSource connection
 * If the connection doesn't exist is created
 * 
 */
exports.makeDb = async () => {
  try {
    if (!mongoClient.isConnected()) {
      await mongoClient.connect()
      console.debug('Database connected')
    }
    
    return mongoClient.db('hexagonal')
  } catch (error) {
    console.error('Database error', error.message)
  }
}

/**
 * Insert new document
 * 
 * @param {string} collection 
 * @param {any} info 
 */
exports.insert = async (collection, info) => {
  const db = await this.makeDb()

  const result = await db
    .collection(collection)
    .insertOne(info)
    
  return result.ops[0]
}

/**
 * Get all collection documents
 * 
 * @param {string} collection 
 * @param {any} query 
 * 
 * @returns {any[]} all collection's documents
 */
exports.getAll = async (collection, query) => {
  const db = await this.makeDb()

  const result = await db
    .collection(collection)
    .find(query)
    .toArray()
    
  return result
}