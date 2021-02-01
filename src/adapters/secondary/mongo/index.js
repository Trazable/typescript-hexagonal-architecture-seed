/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { MongoClient, Db } = require('mongodb')
// eslint-disable-next-line no-unused-vars
const GoogleCloudSecret = require('../google/managers/secret')

class MongoManager {
  /**
   *
   * @param {string} uri
   * @param {string} user
   * @param {string} password
   * @param {*} logger
   * @param {GoogleCloudSecret} secretManager
   */
  constructor(logger, secretManager) {
    this.client = undefined
    this.logger = logger
    this.secretManager = secretManager

    // DEFAULT CREDENTIALS
    this.databaseSecrets = {
      DB_URI: process.env.DB_URI || 'mongodb://mongo:27017/ivs?authSource=admin',
      DB_USER: process.env.DB_USER || 'mongoadmin',
      DB_PASSWORD: process.env.DB_PASSWORD || 'secret',
    }
  }

  /**
   * @return {Promise<MongoClient>}
   */
  async connect() {
    try {
      // DOWNLOAD SECRETS
      if (this.#isGoogleVariablesInjected()) {
        this.databaseSecrets = await this.#getDataBaseSecrets()
        this.logger.info('Database variables downloaded')
      }

      this.client = new MongoClient(this.databaseSecrets.DB_URI, {
        useUnifiedTopology: true,
        auth: {
          user: this.databaseSecrets.DB_USER,
          password: this.databaseSecrets.DB_PASSWORD,
        },
      })

      // DESTROY SECRETS
      delete this.databaseSecrets.DB_URI
      delete this.databaseSecrets.DB_USER
      delete this.databaseSecrets.DB_PASSWORD

      // CONNECT WITH THE DATABASE
      await this.client.connect()

      if (this.isConnected()) {
        this.logger.info('Database connected')
      }
      return this.client
    } catch (error) {
      this.logger.error('An error occurred connecting to the database')
      this.logger.error(error.stack)
    }
  }

  /**
   * @return {Promise<void>}
   */
  async closeConnection() {
    try {
      this.client.close()
      this.client = undefined
    } catch (error) {
      this.logger.error(error)
    }
  }

  /**
   * @return {MongoClient}
   */
  getClient() {
    return this.client
  }

  /**
   * @return {Db}
   */
  getDatabase() {
    return this.client.db()
  }

  /**
   *
   */
  isConnected() {
    let isConnected = false
    if (this.client) {
      isConnected = this.client.isConnected()
    }
    return isConnected
  }

  /**
   * @return {Promise<{DB_URI: string, DB_USER: string, DB_PASSWORD: string}>}
   */
  async #getDataBaseSecrets() {
    return this.secretManager.getSecret(
      process.env.SECRETS_BUCKET,
      process.env.MONGO_VARIABLES_FILENAME,
      process.env.KMS_KEY_CREDENTIALS
    )
  }

  /**
   * @return {boolean}
   */
  #isGoogleVariablesInjected() {
    return (
      process.env.GCLOUD_PROJECT_ID &&
      process.env.SECRETS_BUCKET &&
      process.env.MONGO_VARIABLES_FILENAME &&
      process.env.KMS_KEYRING &&
      process.env.KMS_KEY_CREDENTIALS &&
      process.env.KMS_LOCATION
    )
  }
}

module.exports = MongoManager
