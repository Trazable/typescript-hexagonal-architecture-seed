// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
export interface IStorage {
  getBuckets(): Promise<string[]>

  createBucket(bucketName: string): Promise<void>

  downloadFile(bucket: string, fileName: string): Promise<Buffer | undefined>

  uploadObject(bucketName: string, fileName: string, serviceName: string): Promise<void>

  uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer, bucketName: string): Promise<void>
}
