const GoogleCloudStorage = require('@google-cloud/storage')
const Storage = require('../../../../ports/storage')

class GoogleStorage extends Storage {
  constructor () {
    super()
    this.storage = new GoogleCloudStorage.Storage()
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
