// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')

const ExampleNotFound = require('../../../exceptions/example-not-found')

class ChangeName {
  /**
   *
   * @param {ExampleRepository} repository
   * @param {winston.Logger} logger
   */
  constructor (repository, logger) {
    this.repository = repository
    this.logger = logger

    this.execute = this.execute.bind(this)
  }

  /**
   *
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async execute (id, example) {
    this.logger.info('Changing the example name')
    // REPOSITORY
    // Retrieve the entity with all data
    const updatedExample = await this.repository.getById(id)

    if (!updatedExample) throw new ExampleNotFound()
    // ENTITY LOGIC
    // Change only the necessary field in the useCase
    updatedExample.changeName(example.name)
    // REPOSITORY
    // Update the entity
    await this.repository.update(updatedExample)

    this.logger.info('The name has been successfully changed')

    return updatedExample
  }
}

module.exports = ChangeName
