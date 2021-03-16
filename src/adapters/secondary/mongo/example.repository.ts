import { MongoClient } from 'mongodb'
import { IExampleRepository } from '../../../repositories/example.repository'
import { Example } from '../../../entities/example'
import { ILogger } from '../../../ports/logger'

export class MongoExampleRepository implements IExampleRepository {
  private readonly client: MongoClient
  private readonly logger: ILogger
  private readonly COLLECTION = 'example'

  constructor(client: MongoClient, logger: ILogger) {
    this.client = client
    this.logger = logger
  }

  async save(example: Example): Promise<void> {
    this.logger.info('Saving entity example in the database')
    await this.client.db().collection(this.COLLECTION).insertOne(example)
  }

  async getAll(): Promise<Example[]> {
    this.logger.info('Retrieving all examples from the database')
    const result = await this.client.db().collection(this.COLLECTION).find().toArray()
    return result.map(document => new Example(document))
  }

  async update(example: Example): Promise<void> {
    this.logger.info('Update exmaple in the database')
    await this.client.db().collection(this.COLLECTION).updateOne({ _id: example._id }, { $set: example })
  }

  async getById(_id: string): Promise<Example | undefined> {
    this.logger.info('Retrieving entity by id from the database')
    const result = await this.client.db().collection(this.COLLECTION).findOne({ _id })
    return result ? new Example(result) : undefined
  }

  async getByName(name: string): Promise<Example | undefined> {
    this.logger.info('Retrieving entity by name from the database')
    const result = await this.client.db().collection(this.COLLECTION).findOne({ name: name })
    return result ? new Example(result) : undefined
  }
}
