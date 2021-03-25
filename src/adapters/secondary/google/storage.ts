import { Storage } from '@google-cloud/storage'
import { IStorage } from '../../../ports/storage'

export class GoogleStorage implements IStorage {
  private readonly storage: Storage

  constructor() {
    this.storage = new Storage()
  }

  async getFiles(bucketName: string): Promise<string[] | undefined> {
    // Get files in the bucket
    if (bucketName) {
      const [files] = await this.storage.bucket(bucketName).getFiles()
      return files.map(({ name }) => name)
    }
  }

  async createBucket(bucketName: string): Promise<void> {
    if (bucketName) {
      await this.storage.createBucket(bucketName, {
        multiRegional: false,
        regional: false,
        location: 'europe-west1',
      })
    }
  }

  async getBuckets(): Promise<string[]> {
    const [buckets] = await this.storage.getBuckets()
    return buckets.map(({ name }) => name)
  }

  async downloadFile(fileName: string, bucketName?: string): Promise<Buffer | undefined> {
    if (bucketName && fileName) {
      // Downloads the file
      const [content] = await this.storage.bucket(bucketName).file(fileName).download()

      return content
    }
  }

  async uploadObject(fileName: string, serviceName: string, bucketName?: string): Promise<void> {
    if (bucketName) {
      const fileNameSplitted = fileName.split('/')
      const fileNameWithoutPath = fileName.split('/')[fileNameSplitted.length - 1]
      // Uploads a local file to the bucket
      await this.storage.bucket(bucketName).upload(fileName, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        // gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        destination: `${serviceName}/${fileNameWithoutPath}`,
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          // cacheControl: 'public, max-age=31536000',
          cacheControl: 'no-cache',
        },
      })
    }
  }

  async uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer, bucketName?: string): Promise<void> {
    if (bucketName) {
      const bucket = this.storage.bucket(bucketName)
      const file = bucket.file(fileName)
      return new Promise((resolve, reject) => {
        const stream = file.createWriteStream({
          metadata: {
            contentType: mimeType,
          },
          resumable: false,
        })

        stream.on('error', error => {
          reject(error)
        })

        stream.on('finish', () => {
          resolve()
        })
        stream.end(fileBuffer)
      })
    }
  }
}
