import { ISecret } from '../../../../ports/secret'
import { GoogleKMS } from '../third-party-services/kms'
import { GoogleStorage } from '../third-party-services/storage'

export class GoogleCloudSecret implements ISecret {
  private readonly kmsClient: GoogleKMS
  private readonly storage: GoogleStorage

  constructor() {
    this.kmsClient = new GoogleKMS()
    this.storage = new GoogleStorage()
  }

  async getSecret(bucketName: string, fileName: string): Promise<Record<string, string> | undefined> {
    if (bucketName && fileName) {
      // Download file
      const bufferSecret = await this.storage.downloadFile(bucketName, fileName)
      // Decrypt secret
      if (bufferSecret) {
        const secret = await this.kmsClient.decrypt(bufferSecret)

        // Parse JSON the configuration file
        return secret ? JSON.parse(secret.toString()) : undefined
      }
    }
  }
}
