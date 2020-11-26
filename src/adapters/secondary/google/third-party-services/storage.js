const GoogleCloudStorage = require('@google-cloud/storage')
const Storage = require('../../../../ports/storage')

class GoogleStorage extends Storage {
  constructor () {
    super()
    this.storage = new GoogleCloudStorage.Storage()
  }

  /**
  * Get a list of storage buckets
  * @return {Promise<Array<Bucket>>} elements digested
  */
  async getBuckets () {
    const [buckets] = await this.storage.getBuckets()
    return buckets
  }


  /**
  * Get a list of storage bucket's files
  * @param {string} bucketName
  * @return {Promise<Array<File>>} elements digested
  */
  async getFiles (bucketName) {
    // Get files in the bucket
    const [files] = await this.storage.bucket(bucketName).getFiles()
    return files
  }


  /**
  * Downloads a file from a storage bucket
  * @async
  * @param {string} bucket
  * @param {string} fileName
  * @returns {Promise<Buffer>} file content
  */
  async downloadFile (bucket, fileName) {
    // Downloads the file
    const [content] = await this.storage
      .bucket(bucket)
      .file(fileName)
      .download()

    return content
  }
}

module.exports = GoogleStorage
