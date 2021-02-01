const KeyManagement = require('../../../../ports/kms')
const { KeyManagementServiceClient } = require('@google-cloud/kms')

class GoogleKMS extends KeyManagement {
  constructor() {
    super()
    this.kmsClient = new KeyManagementServiceClient()
  }

  /**
   * Encrypts an element
   * @async
   * @param {string | Buffer | ArrayBuffer | Array | Array-like} plaintext
   * @param {string} keyName any of kms.KMS_KEY
   * @returns {Promise<string>} element digested in base64
   */
  async encrypt(plaintext, keyName) {
    // Key name to use
    const name = this.kmsClient.cryptoKeyPath(
      process.env.GCLOUD_PROJECT_ID,
      process.env.KMS_LOCATION,
      process.env.KMS_KEYRING,
      keyName
    )

    // Internally Buffer is an immutable array of integers that is also capable of performing many different encodings/decodings.
    // These include to/from UTF-8, UCS2, Base64 or even Hex encodings.
    // If you write code that deals with and manipulates data, you'll likely be using the Buffer object at some point.
    plaintext = Buffer.from(plaintext).toString('base64')

    // Encrypts the element using the specified crypto key
    const [result] = await this.kmsClient.encrypt({ name, plaintext })

    return result.ciphertext.toString('base64')
  }

  /**
   *
   * @async
   * @param {Buffer} ciphertext as base64 string
   * @param {string} keyName
   * @param {{ project: string, location: string, keyRing: string }}
   * @returns {Promise<string>} element digested in ascii
   */
  async decrypt(ciphertext, keyName) {
    // Key name to use
    const name = this.kmsClient.cryptoKeyPath(
      process.env.GCLOUD_PROJECT_ID,
      process.env.KMS_LOCATION,
      process.env.KMS_KEYRING,
      keyName
    )

    // Decrypts the element using the specified crypto key
    const [result] = await this.kmsClient.decrypt({ name, ciphertext })

    return result.plaintext.toString()
  }
}

module.exports = GoogleKMS
