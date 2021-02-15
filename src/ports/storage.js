// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
class Storage {
  /**
   * @return {Promise<Array<Bucket>>} elements digested
   */
  async getBuckets() {
    return Promise.reject(new Error('Method getBuckets not implemented'))
  }

  /**
   * @param {string} bucketName
   * @return {Promise<Array<File>>} elements digested
   */
  async getFiles(bucketName) {
    return Promise.reject(new Error('Method getFiles not implemented'))
  }

  /**
   *
   * @param {string} bucketName
   * @return {Promise<void>}
   */
  async createBucket(bucketName) {
    return Promise.reject(new Error('Method createBucket not implemented'))
  }

  /**
   *
   * @param {string} bucket
   * @param {string} fileName
   * @return {Promise<Buffer>}
   */
  async downloadFile(bucket, fileName) {
    return Promise.reject(new Error('Method downloadFile not implemented'))
  }

  /**
   * Uploads an object to a storage bucket
   * @async
   * @param {string} bucketName
   */
  async uploadObject(bucketName, fileName, serviceName) {
    return Promise.reject(new Error('Method uploadObject not implemented'))
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
    return Promise.reject(new Error('Method uploadFile not implemented'))
  }
}

module.exports = Storage
