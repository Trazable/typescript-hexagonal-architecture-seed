// eslint-disable-next-line no-unused-vars
const GoogleStorage = require('../third-party-services/storage')

class GoogleCloudStorageManager {
  /**
   *
   * @param {GoogleStorage} storage
   */
  constructor(storage) {
    this.storage = storage
  }

  /**
   * Upload fileBuffer
   * @param {strin} filePath
   * @param {string} fileName
   * @param {string} mimeType
   * @param {Buffer} fileBuffer
   * @param {string} bucketName
   */
  async uploadFile(fileName, mimeType, fileBuffer, bucketName) {
    if (!this.#verifyBucketExists(bucketName)) await this.storage.createBucket(bucketName)
    await this.storage.uploadFile(fileName, mimeType, fileBuffer, bucketName)
  }

  /**
   *
   * @param {string} bucketName
   * @return {Promise<boolean>}
   */
  async #verifyBucketExists(bucketName) {
    const buckets = await this.storage.getBuckets()
    return buckets.includes(bucketName)
  }
}

module.exports = GoogleCloudStorageManager
