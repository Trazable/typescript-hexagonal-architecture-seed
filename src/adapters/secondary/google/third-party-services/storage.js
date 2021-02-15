const GoogleCloudStorage = require('@google-cloud/storage')
const Storage = require('../../../../ports/storage')

class GoogleStorage extends Storage {
  constructor() {
    super()
    this.storage = new GoogleCloudStorage.Storage()
  }

  /**
   * Get a list of storage buckets
   * @async
   * @return {Promise<Array<Bucket>>} elements digested
   */
  async getBuckets() {
    const [buckets] = await this.storage.getBuckets()
    return buckets
  }

  /**
   * Get a list of storage bucket's files
   * @async
   * @param {string} bucketName
   * @return {Promise<Array<File>>} elements digested
   */
  async getFiles(bucketName) {
    // Get files in the bucket
    const [files] = await this.storage.bucket(bucketName).getFiles()
    return files
  }

  /**
   * @async
   * @param {string} bucketName
   * @return {Promise<void>}
   */
  async createBucket(bucketName) {
    await this.storage.createBucket(bucketName, {
      multiRegional: false,
      regional: false,
      location: 'europe-west1',
    })
  }

  /**
   * Downloads a file from a storage bucket
   * @async
   * @param {string} bucket
   * @param {string} fileName
   * @returns {Promise<Buffer>} file content
   */
  async downloadFile(bucket, fileName) {
    // Downloads the file
    const [content] = await this.storage.bucket(bucket).file(fileName).download()

    return content
  }

  /**
   * Uploads an object to a storage bucket
   * @async
   * @param {string} bucketName
   */
  async uploadObject(bucketName, fileName, serviceName) {
    const fileNameSplitted = fileName.split('/')
    const fileNameWithoutPath = fileName.split('/')[fileNameSplitted.length - 1]
    // Uploads a local file to the bucket
    await this.storage.bucket(bucketName).upload(fileName, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      // gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      destination: `${serviceName}/${fileNameWithoutPath}`,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        // cacheControl: 'public, max-age=31536000',
        cacheControl: 'no-cache',
      },
    })
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
    const bucket = this.storage.bucket(bucketName)
    const file = bucket.file(fileName)
    return new Promise((resolve, reject) => {
      const stream = file.createWriteStream({
        metadata: {
          contentType: mimeType,
        },
        resumable: false,
      })

      stream.on('error', error => {
        reject(error)
      })

      stream.on('finish', () => {
        fileBuffer.cloudStorageObject = fileName
        resolve()
      })
      stream.end(fileBuffer.buffer)
    })
  }
}

module.exports = GoogleStorage
