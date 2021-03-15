import { GoogleStorage } from '../third-party-services/storage'

export class GoogleCloudStorageManager {
  storage: GoogleStorage
  constructor() {
    this.storage = new GoogleStorage()
  }

  async uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer, bucketName: string): Promise<void> {
    if (!(await this.verifyBucketExists(bucketName))) await this.storage.createBucket(bucketName)
    await this.storage.uploadFile(fileName, mimeType, fileBuffer, bucketName)
  }

  async uploadObject(bucketName: string, fileName: string, serviceName: string): Promise<void> {
    if (!(await this.verifyBucketExists(bucketName))) await this.storage.createBucket(bucketName)
    await this.storage.uploadObject(bucketName, fileName, serviceName)
  }

  private async verifyBucketExists(bucketName: string): Promise<boolean> {
    const buckets = await this.storage.getBuckets()
    return buckets.includes(bucketName)
  }
}
