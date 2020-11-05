
// EXAMPLE SERVICE
const ExampleRepository = require('../repositories/example.repository') // eslint-disable-line no-unused-vars

// Get the injected dependency from the controller
/**
 *
 * @param {ExampleRepository} exampleRepository
 */
module.exports = (exampleRepository) => {
  /**
   *
   * @param {*} example
   * @return {Promise<T>}
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
   *
   * @return {Promise<T>}
   */
  const getAll = async () => {
    // Business logic
    // If an object is not created, whatever comes in the input will be saved in the database.

    // Call the repository to save the data in the database, if the following method is not implemented in the datasource, then the repository will thrown an error.
    return exampleRepository.getAll()
  }

  return { save, getAll }
}

