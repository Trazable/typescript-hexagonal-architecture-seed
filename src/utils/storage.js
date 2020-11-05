const { Storage } = require('@google-cloud/storage')
const { logger } = require('./logger')

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage()

/**
 * Get a list of storage buckets
 * @async
 * @returns {Promise<Array<Bucket>>} elements digested
 */
const getBuckets = async () => {
  try {
    const [buckets] = await storage.getBuckets()
    return buckets
  } catch (error) {
    logger.error(error.stack)
  }
}


/**
 * Get a list of storage bucket's files
 * @async
 * @param {string} bucketName
 * @returns {Promise<Array<File>>} elements digested
 */
const getFiles = async (bucketName) => {
  try {
    // Get files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles()
    return files
  } catch (error) {
    logger.error(error.stack)
  }
}


/**
 * Downloads a file from a storage bucket
 * @async
 * @param {string} bucketName
 * @param {string} sourceFile
 * @returns {Promise<Buffer>} file content
 */
const downloadFile = async (bucketName, sourceFile) => {
  try {
    // Downloads the file
    const [content] = await storage
      .bucket(bucketName)
      .file(sourceFile)
      .download()

    return content
  } catch (error) {
    logger.error(error.stack)
  }
}


module.exports = {
  getBuckets,
  getFiles,
  downloadFile,
}
