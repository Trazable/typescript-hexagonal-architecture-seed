/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { MongoClient, Db } = require('mongodb')

class MongoManager {
  /**
   *
   * @param {string} uri
   * @param {string} user
   * @param {string} password
   */
  constructor (uri, user, password) {
    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
      auth: {
        user,
        password,
      },
    })
    this.connect()
  }

  /**
   * @return {Promise<void>}
   */
  async connect () {
    try {
      await this.client.connect()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @return {Promise<void>}
   */
  async closeConnection () {
    try {
      this.client.close()
      this.client = undefined
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @return {MongoClient}
   */
  getClient () {
    return this.client
  }

  /**
   * @return {Db}
   */
  getDatabase () {
    return this.client.db()
  }

  /**
   * @return {boolean}
   */
  isConnected () {
    let isConnected = false
    if (this.client) {
      isConnected = this.client.isConnected()
    }
    return isConnected
  }
}

module.exports = MongoManager
