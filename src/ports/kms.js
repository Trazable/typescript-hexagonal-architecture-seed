// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
class KeyManagement {
  /**
 * Encrypts an element
 * @async
 * @param {string | Buffer | ArrayBuffer | Array | Array-like} plaintext
 * @param {string} keyName any of kms.KMS_KEY
 * @returns {Promise<string>} element digested in base64
 */
  async encrypt (plaintext, keyName) {
    return Promise.reject(new Error('Method encrypt not implemented'))
  }

  /**
 *
 * @async
 * @param {string} ciphertext as base64 string
 * @returns {Promise<string>} element digested in ascii
 */
  async decrypt (chiperText, keyName) {
    return Promise.reject(new Error('Method decrypt not implemented'))
  }
}

module.exports = KeyManagement
