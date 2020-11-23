// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../../repositories/example.repository')
// eslint-disable-next-line no-unused-vars
const Example = require('../../../entities/example')
const { ObjectId } = require('mongodb')

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
    const newExample = await this.repository.save(new Example({ id: new ObjectId().toHexString(), ...example, createdAt: new Date() }))
    return newExample
  }
}

module.exports = Add
