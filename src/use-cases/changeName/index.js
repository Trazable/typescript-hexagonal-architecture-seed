// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../ports/secondary/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')
const IChangeName = require('../../ports/primary/changename')

const ExampleNotFound = require('../../exceptions/example-not-found')

class ChangeName extends IChangeName {
  /**
   *
   * @param {ExampleRepository} repository
   * @param {winston.Logger} logger
   */
  constructor (repository, logger) {
    super()
    this.repository = repository
    this.logger = logger

    this.getLoggerContainer = this.getLoggerContainer.bind(this)
    this.execute = this.execute.bind(this)
  }

  /**
   * @param {string} id
   * @param {string} name
   * @return {Promise<Example>}
   */
  async execute (id, name) {
    this.logger.info('Changing the example name')
    // REPOSITORY
    // Retrieve the entity with all data
    const example = await this.repository.getById(id)

    // BUSINESS EXCEPTIONS
    if (!example) throw new ExampleNotFound()
    // ENTITY LOGIC
    // Change only the necessary field in the useCase
    example.changeName(name)
    // REPOSITORY
    // Update the entity
    await this.repository.update(example)

    this.logger.info('The name has been successfully changed')

    return example
  }

  /**
   * @return {winston.Logger}
   */
  getLoggerContainer () {
    return this.logger
  }
}

module.exports = ChangeName
