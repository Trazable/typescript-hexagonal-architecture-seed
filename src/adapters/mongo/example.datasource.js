// eslint-disable-next-line no-unused-vars
const { MongoClient } = require('mongodb')
const Example = require('../../entities/example')
const ExampleRepository = require('../../repositories/example.repository')

class ExampleMongoDataSource extends ExampleRepository {
  /**
   *
   * @param {MongoClient} client
   */
  constructor (client) {
    super()
    this.client = client
  }

  /**
   *
   * @param {Example} example
   * @return {Promise<Example>} example
   */
  async save (example) {
    const result = await this.client.db().collection('example').insertOne(example)
    return new Example(result.ops[0])
  }

  /**
   * @return {Promise<Example[]>}
   */
  async getAll () {
    const result = await this.client.db().collection('example').find().toArray()
    return result.map(document => new Example(document))
  }

  /**
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async update (example) {
    const { value } = await this.client.db().collection('example').findOneAndUpdate({ name: example.name }, { $set: example }, { returnOriginal: false })
    return new Example(value)
  }
}

module.exports = ExampleMongoDataSource
