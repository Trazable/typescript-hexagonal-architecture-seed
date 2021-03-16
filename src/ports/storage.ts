// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

/**
 * Port to manage storage systems
 * @namespace storage
 */
export interface IStorage {
  /**
   * Get a list of buckets availables
   *
   * @returns A list of storage names
   */
  getBuckets(): Promise<string[]>

  /**
   * Create a new bucket
   *
   * @param bucketName - the new bucket name
   */
  createBucket(bucketName: string): Promise<void>

  /**
   * Create a new bucket
   *
   * @param bucketName - The bucket name where the file is
   * @param fileName - The new filename
   * @returns The file
   */
  downloadFile(bucketName: string, fileName: string): Promise<Buffer | undefined>

  /**
   * Upload a file to an existent bucket
   *
   * @param bucketName - The bucket name
   * @param fileName - The new filename
   * @param serviceName - The service name
   */
  uploadObject(bucketName: string, fileName: string, serviceName: string): Promise<void>

  /**
   * Upload a file to an existent bucket
   *
   * @param fileName - The new filename
   * @param mimeType - MimeType
   * @param fileBuffer - The file content
   * @param bucketName - The bucket name
   */
  uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer, bucketName: string): Promise<void>
}
