/* eslint-disable no-console */
const { MongoClient } = require('mongodb')

// DATABASE CONFIGURATION
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const initDatabase = async () => {
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

module.exports = initDatabase

