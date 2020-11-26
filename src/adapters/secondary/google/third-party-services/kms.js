const KeyManagement = require('../../../../ports/kms')
const { KeyManagementServiceClient } = require('@google-cloud/kms')

class GoogleKMS extends KeyManagement {
  constructor () {
    super()
    this.kmsClient = new KeyManagementServiceClient()
  }

  /**
  *
  * @async
  * @param {Buffer} chiperText as base64 string
  * @param {string} keyName
  * @param {{ project: string, location: string, keyRing: string }}
  * @returns {Promise<string>} element digested in ascii
  */
  async decryptFile (chiperText, keyName, {
    project = process.env.GCLOUD_PROJECT_ID,
    location = process.env.KMS_LOCATION,
    keyRing = process.env.KMS_KEYRING,
  }) {
    try {
      // Key name to use
      const name = this.kmsClient.cryptoKeyPath(
        project,
        location,
        keyRing,
        keyName
      )

      // Decrypts the element using the specified crypto key
      const [result] = await this.kmsClient.decrypt({ name, chiperText })

      return result.plaintext.toString()
    } catch (error) {
      throw new Error('Error in kms Decrypt, check the ciphertext or keyname', error)
    }
  }
}

module.exports = GoogleKMS
