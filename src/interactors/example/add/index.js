// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')

class Add {
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
    const newExample = await this.repository.save(new Example({ ...example, createdAt: new Date() }))
    return newExample
  }
}

module.exports = Add
