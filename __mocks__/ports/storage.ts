/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStorage } from '../../src/ports/storage'
export class FakeStorage implements IStorage {
  getBuckets(): Promise<string[]> {
    throw new Error('Method not implemented.')
  }

  createBucket(bucketName: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  downloadFile(bucketName: string, fileName: string): Promise<Buffer | undefined> {
    throw new Error('Method not implemented.')
  }

  deleteFile(bucketName: string, fileName: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  uploadObject(bucketName: string, fileName: string, serviceName: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer, bucketName?: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
