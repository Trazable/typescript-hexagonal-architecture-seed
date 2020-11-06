const ExampleRepository = require('../../repositories/example.repository') // eslint-disable-line no-unused-vars
const { logger } = require('../../utils/logger')

/**
 * @name addExample
 * @description Add a new example document
 *
 * @param {ExampleRepository} exampleRepository
 * @returns {(data: { name: string }) => Promise<any>} exampleData
 */
const addExample = (exampleRepository) => async ({ name }) => {
  try {
    const example = {
      name,
      createdAt: new Date().toISOString(),
    }

    const newExample = await exampleRepository.save(example)
    return newExample
  } catch (error) {
    logger.error(error)
    throw new Error('Some error while trying to create a new example document')
  }
}

module.exports = addExample
