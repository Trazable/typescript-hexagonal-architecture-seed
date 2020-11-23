// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')

class ChangeName {
  /**
   *
   * @param {ExampleRepository} repository
   */
  constructor (repository) {
    this.repository = repository
  }

  /**
   *
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async execute (example) {
    // REPOSITORY
    // Retrieve the entity with all data
    const updateExample = await this.repository.getById(example.id)
    // ENTITY LOGIC
    // Change only the necessary field in the useCase
    updateExample.changeName(example.name)
    // REPOSITORY
    // Update the entity
    await this.repository.update(example)
    return example
  }
}

module.exports = ChangeName
