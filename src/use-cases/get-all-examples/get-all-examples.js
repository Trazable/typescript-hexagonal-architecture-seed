const ExampleRepository = require('../../repositories/example.repository') // eslint-disable-line no-unused-vars
const { logger } = require('../../utils/logger')

/**
 * @name getAllExamples
 * @description Get all example documents
 *
 * @param {ExampleRepository} exampleRepository
 * @returns {() => Promise<any[]>}
 */
const getAllExamples = (exampleRepository) => async () => {
  try {
    const examples = await exampleRepository.getAll()
    return examples
  } catch (error) {
    logger.error(error)
    throw new Error('Some error while trying to get all examples')
  }
}

module.exports = getAllExamples
