class KeyManagement {
  /**
 *
 * @async
 * @param {string} ciphertext as base64 string
 * @returns {Promise<string>} element digested in ascii
 */
  async decryptFile (chiperText, keyName) {
    return Promise.reject(new Error('Method decryptFile not implemented'))
  }
}

module.exports = KeyManagement
