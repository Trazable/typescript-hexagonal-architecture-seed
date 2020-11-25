const Secret = require('../../../../ports/secondary/secret')
const GoogleKms = require('../third-party-services/kms')
const GoogleStorage = require('../third-party-services/storage')

class GoogleCloudSecret extends Secret {
  constructor () {
    super()
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

module.exports = GoogleCloudSecret
