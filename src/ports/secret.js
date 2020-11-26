class Secret {
  /**
   *
   * @param {string} bucketName
   * @param {string} fileName
   * @param {string} kmsKey
   * @return {Promise<any>} secret
   */
  async getSecret (bucketName, fileName, kmsKey) {
    return Promise.reject(new Error('Method getSecret not implemented'))
  }
}

module.exports = Secret
