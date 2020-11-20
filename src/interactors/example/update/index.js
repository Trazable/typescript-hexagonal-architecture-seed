// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')

class Update {
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
    const updatedExample = await this.repository.update(new Example(example))
    return updatedExample
  }
}

module.exports = Update
