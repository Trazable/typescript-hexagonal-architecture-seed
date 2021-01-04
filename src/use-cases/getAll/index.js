// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')

class GetAll {
  /**
   *
   * @param {ExampleRepository} repository
   * @param {winston.Logger} logger
   */
  constructor (repository, logger) {
    this.repository = repository
    this.logger = logger

    this.getLoggerContainer = this.getLoggerContainer.bind(this)
    this.execute = this.execute.bind(this)
  }

  /**
   *
   * @return {Promise<Example[]>}
   */
  async execute () {
    this.logger.info('Retrieving all examples')
    return this.repository.getAll()
  }

  /**
   * @return {winston.Logger}
   */
  getLoggerContainer () {
    return this.logger
  }
}

module.exports = GetAll
