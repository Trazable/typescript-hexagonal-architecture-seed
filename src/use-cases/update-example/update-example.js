const ExampleRepository = require('../../repositories/example.repository') // eslint-disable-line no-unused-vars
const { logger } = require('../../utils/logger')

/**
 * @name updateExample
 * @description Add a new example document
 *
 * @param {ExampleRepository} exampleRepository
 * @returns {(exampleId: string, exampleData: any) => Promise<any>} exampleData
 */
const updateExample = (exampleRepository) => async (exampleId, exampleData) => {
  try {
    return exampleRepository.update(exampleId, exampleData)
  } catch (error) {
    logger.error(error)
    throw new Error('Some error while trying to update the document')
  }
}

module.exports = updateExample
