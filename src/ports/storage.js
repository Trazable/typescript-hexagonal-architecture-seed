class Storage {
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
