import { ISecret } from '../../../ports/secret'
import { IKeyManagement } from '../../../ports/kms'
import { IStorage } from '../../../ports/storage'
export class GoogleCloudSecret implements ISecret {
  private readonly kmsClient: IKeyManagement
  private readonly storage: IStorage

  constructor(googleKMS: IKeyManagement, googleStorage: IStorage) {
    this.kmsClient = googleKMS
    this.storage = googleStorage
  }

  async getSecret(bucketName: string, fileName: string): Promise<Record<string, string> | undefined> {
    if (bucketName && fileName) {
      // Download file
      const bufferSecret = await this.storage.downloadFile(fileName, bucketName)
      // Decrypt secret
      if (bufferSecret) {
        const secret = await this.kmsClient.decrypt(bufferSecret)

        // Parse JSON the configuration file
        return secret ? JSON.parse(secret.toString()) : undefined
      }
    }
  }
}
