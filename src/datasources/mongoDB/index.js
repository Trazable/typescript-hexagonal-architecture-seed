const { MongoClient } = require('mongodb')
const { loggerController: logger } = require('../../utils/logger')

// DATABASE CONFIGURATION
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const initDatabase = async () => {
  try {
    if (!mongoClient.isConnected()) {
      await mongoClient.connect()
      logger.info('Database connected')
    }

    return mongoClient.db('hexagonal')
  } catch (error) {
    logger.error('Database error', error.message)
  }
}

module.exports = initDatabase

