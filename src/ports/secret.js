// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
class Secret {
  /**
   *
   * @param {string} bucketName
   * @param {string} fileName
   * @param {string} kmsKey
   * @return {Promise<any>} secret
   */
  async getSecret(bucketName, fileName, kmsKey) {
    return Promise.reject(new Error('Method getSecret not implemented'))
  }
}

module.exports = Secret
