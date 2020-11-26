class Storage {
  /**
  * @return {Promise<Array<Bucket>>} elements digested
  */
  async getBuckets () {
    return Promise.reject(new Error('Method getBuckets not implemented'))
  }


  /**
  * @param {string} bucketName
  * @return {Promise<Array<File>>} elements digested
  */
  async getFiles (bucketName) {
    return Promise.reject(new Error('Method getFiles not implemented'))
  }

  /**
   *
   * @param {string} bucket
   * @param {string} fileName
   * @return {Promise<Buffer>}
   */
  async downloadFile (bucket, fileName) {
    return Promise.reject(new Error('Method downloadFile not implemented'))
  }
}

module.exports = Storage
