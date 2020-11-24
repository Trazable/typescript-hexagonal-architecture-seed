const { Storage } = require('@google-cloud/storage')
const StorageRepository = require('../../../ports/storage')

class GoogleStorage extends StorageRepository {
  constructor () {
    super()
    this.storage = new Storage()
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
