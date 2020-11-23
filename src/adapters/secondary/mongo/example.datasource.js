// eslint-disable-next-line no-unused-vars
const { MongoClient } = require('mongodb')
const Example = require('../../../entities/example')
const ExampleRepository = require('../../../repositories/example.repository')

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
    return result.length > 0 ? result.map(document => new Example(document)) : []
  }

  /**
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async update (example) {
    const { value } = await this.client.db().collection('example').updateOne({ id: example.id }, { $set: example }, { returnOriginal: false })
    return value ? new Example(value) : undefined
  }

  /**
   *
   * @param {string} id
   * @return {Promise<Example>}
   */
  async getById (id) {
    const result = await this.client.db().collection('example').findOne({ id: id })
    return result ? new Example(result) : undefined
  }
}

module.exports = ExampleMongoDataSource
