// eslint-disable-next-line no-unused-vars
const { MongoClient } = require('mongodb')
const Example = require('../../../entities/example')
const ExampleRepository = require('../../../repositories/example.repository')

class MongoExampleRepository extends ExampleRepository {
  /**
   *
   * @param {MongoClient} client
   * @param {winston.Logger} logger
   */
  constructor (client, logger) {
    super()
    this.client = client
    this.logger = logger
  }

  /**
   *
   * @param {Example} example
   * @return {Promise<Example>} example
   */
  async save (example) {
    this.logger.info('Saving the entity example in the database')
    const result = await this.client.db().collection('example').insertOne(example)
    return new Example(result.ops[0])
  }

  /**
   * @return {Promise<Example[]>}
   */
  async getAll () {
    this.logger.info('Retrieving the data from the database')
    const result = await this.client.db().collection('example').find().toArray()
    return result.map(document => new Example(document))
  }

  /**
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async update (example) {
    this.logger.info('Updating the data in the database')
    const { value } = await this.client.db().collection('example').updateOne({ id: example.id }, { $set: example }, { returnOriginal: false })
    return value ? new Example(value) : undefined
  }

  /**
   *
   * @param {string} id
   * @return {Promise<Example>}
   */
  async getById (id) {
    this.logger.info('Retrieving the entity by ID from the database')
    const result = await this.client.db().collection('example').findOne({ id: id })
    return result ? new Example(result) : undefined
  }

  /**
   *
   * @param {string} name
   * @return {Promise<Example>}
   */
  async getByName (name) {
    this.logger.info('Retrieving the entity by NAME from the database')
    const result = await this.client.db().collection('example').findOne({ name: name })
    return result ? new Example(result) : undefined
  }
}

module.exports = MongoExampleRepository
