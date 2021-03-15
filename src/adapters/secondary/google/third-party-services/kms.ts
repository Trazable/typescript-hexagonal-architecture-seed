import { IKeyManagement } from '../../../../ports/kms'
import { KeyManagementServiceClient } from '@google-cloud/kms'

export class GoogleKMS implements IKeyManagement {
  kmsClient: KeyManagementServiceClient
  constructor() {
    this.kmsClient = new KeyManagementServiceClient()
  }

  async encrypt(plaintext: string | Uint8Array): Promise<string | Uint8Array | undefined> {
    // Key name to use
    if (
      process.env.KMS_KEY_CREDENTIALS &&
      process.env.GCLOUD_PROJECT_ID &&
      process.env.KMS_LOCATION &&
      process.env.KMS_KEYRING
    ) {
      const name = this.kmsClient.cryptoKeyPath(
        process.env.GCLOUD_PROJECT_ID,
        process.env.KMS_LOCATION,
        process.env.KMS_KEYRING,
        process.env.KMS_KEY_CREDENTIALS
      )

      // Internally Buffer is an immutable array of integers that is also capable of performing many different encodings/decodings.
      // These include to/from UTF-8, UCS2, Base64 or even Hex encodings.
      // If you write code that deals with and manipulates data, you'll likely be using the Buffer object at some point.
      plaintext = Buffer.from(plaintext).toString()

      // Encrypts the element using the specified crypto key
      const [result] = await this.kmsClient.encrypt({ name, plaintext })
      return result.ciphertext || undefined
    }
  }

  async decrypt(ciphertext: string | Uint8Array): Promise<string | Uint8Array | undefined> {
    if (
      process.env.KMS_KEY_CREDENTIALS &&
      process.env.GCLOUD_PROJECT_ID &&
      process.env.KMS_LOCATION &&
      process.env.KMS_KEYRING
    ) {
      // Key name to use
      const name = this.kmsClient.cryptoKeyPath(
        process.env.GCLOUD_PROJECT_ID,
        process.env.KMS_LOCATION,
        process.env.KMS_KEYRING,
        process.env.KMS_KEY_CREDENTIALS
      )
      // Decrypts the element using the specified crypto key
      const [result] = await this.kmsClient.decrypt({ name, ciphertext })

      return result.plaintext || undefined
    }
  }
}
