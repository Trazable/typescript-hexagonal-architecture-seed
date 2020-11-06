const MongoDB = require('mongodb')
const { loggerController: logger } = require('../../utils/logger')

// DATABASE CONFIGURATION
const mongoClient = new MongoDB.MongoClient('mongodb://mongo:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: 'mongoadmin',
    password: 'secret',
  },
})

/**
 * @name initDatabase
 * @description Mongo database initialisation only if the database is not already initialised
 *
 * @returns {Promise<MongoDB.Db>}
 */
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

