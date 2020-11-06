const { KeyManagementServiceClient } = require('@google-cloud/kms')
const { logger } = require('./logger')


const client = new KeyManagementServiceClient()


/**
 * Encrypts an element
 * @async
 * @param {string | Buffer | ArrayBuffer | Array | Array-like} plaintext
 * @param {string} keyName any of kms.KMS_KEY
 * @returns {Promise<string>} element digested in base64
 */
const kmsEncrypt = async (plaintext, keyName) => {
  try {
    // Key name to use
    const name = client.cryptoKeyPath(
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
    const [result] = await client.encrypt({ name, plaintext })

    return result.ciphertext.toString('base64')
  } catch (error) {
    logger.error(`Error in kms Encrypt: ${error.stack}`)
    throw new Error('Error in kms Encrypt, check the plaintext or keyname', error)
  }
}

/**
 * Decrypts an element
 *
 * @async
 * @param {string} ciphertext as base64 string
 * @returns {Promise<string>} element digested in ascii
 */
const kmsDecrypt = async (ciphertext, keyName) => {
  try {
    // Key name to use
    const name = client.cryptoKeyPath(
      process.env.GCLOUD_PROJECT_ID,
      process.env.KMS_LOCATION,
      process.env.KMS_KEYRING,
      keyName
    )


    // Decrypts the element using the specified crypto key
    const [result] = await client.decrypt({ name, ciphertext })

    return result.plaintext.toString()
  } catch (error) {
    logger.error(`Error in kms Decrypt: ${error.stack}`)
    throw new Error('Error in kms Decrypt, check the ciphertext or keyname', error)
  }
}


module.exports = {
  kmsEncrypt,
  kmsDecrypt,
}
