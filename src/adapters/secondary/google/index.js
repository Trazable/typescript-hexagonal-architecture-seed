const GoogleKms = require('./kms.repository')
const GoogleStorage = require('./storage.repository')

class GoogleCloudManager {
  constructor () {
    this.kmsClient = new GoogleKms()
    this.storage = new GoogleStorage()
  }

  /**
   *
   * @param {string} bucketName
   * @param {string} fileName
   * @param {string} kmsKey
   * @return {Promise<any>} secret
   */
  async getSecret (bucketName, fileName, kmsKey) {
    // Download file
    const bufferSecret = await this.storage.downloadFile(bucketName, fileName)
    // Decrypt secret
    const secret = await this.kmsClient.decryptFile(bufferSecret, kmsKey)
    // Parse JSON the configuration file
    return JSON.parse(secret)
  }
}

module.exports = GoogleCloudManager
