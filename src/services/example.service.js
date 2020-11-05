// EXAMPLE SERVICE
const ExampleRepository = require('../repositories/example.repository') // eslint-disable-line no-unused-vars

// Get the injected dependency from the controller
/**
 *
 * @param {ExampleRepository} exampleRepository
 */
module.exports = (exampleRepository) => {
  /**
   * @name save
   * @description save a new example document
   *
   * @param {any} example
   * @returns {Promise<any>} the example document saved in db
   */
  const save = async (exampleData) => {
    // Business logic

    // Create initial runtime structure to be saved in the database.
    // In this example, if exampleData has no name, age and hobbies then an error of undefined will be thrown
    const example = {
      name: exampleData.name,
      createdAt: new Date(),
    }
    // If an object is not created, whatever comes in the input will be saved in the database.

    // Call the repository to save the data in the database, if the following method is not implemented in the datasource, then the repository will thrown an error.
    return exampleRepository.save(example)
  }

  /**
   * @name getAll
   * @description Get all example documents
   *
   *
   * @returns {Promise<any[]>} all example documents
   */
  const getAll = async () => {
    // Business logic
    // If an object is not created, whatever comes in the input will be saved in the database.

    // Call the repository to save the data in the database, if the following method is not implemented in the datasource, then the repository will thrown an error.
    return exampleRepository.getAll()
  }

  /**
   * @name update
   * @description Atomic update
   *
   * @param {string} exampleId document id
   * @param {any} example
   * @returns {Promise<any>} the full document updated
   */
  const update = async (exampleId, exampleData) => {
    // Business logic
    // If an object is not created, whatever comes in the input will be saved in the database.

    // Call the repository to save the data in the database, if the following method is not implemented in the datasource, then the repository will thrown an error.
    return exampleRepository.update(exampleId, exampleData)
  }

  return { save, getAll, update }
}
