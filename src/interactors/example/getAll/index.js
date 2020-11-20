// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')

class GetAll {
  /**
   *
   * @param {ExampleRepository} repository
   */
  constructor (repository) {
    this.repository = repository
  }

  /**
   *
   * @return {Promise<Example[]>}
   */
  async execute () {
    return this.repository.getAll()
  }
}

module.exports = GetAll
