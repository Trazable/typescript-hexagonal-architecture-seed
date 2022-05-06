import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { AlreadyExistsError } from '../../exceptions/already-exists'
import { PropertyRequiredError } from '../../exceptions/property-required'
import { ILogger } from '../../ports/logger'
import { IIDGenerator } from '../../ports/id-generator'
import { IQueue, MessageAttributeOperation } from '../../ports/queue'
import { Inject, Service } from 'typedi'
import {
  EXAMPLE_REPOSITORY,
  ID_GENERATOR,
  MESSAGE_PUBLISHED_TOPIC,
  QUEUE_PUBLISHER,
  USE_CASES_LOGGER,
} from '../../constants'

/**
 * Add new Example UseCase
 * @namespace Example
 */

@Service()
export class Add {
  @Inject(EXAMPLE_REPOSITORY)
  private readonly repository: IExampleRepository

  @Inject(USE_CASES_LOGGER.ADD_USE_CASE_LOGGER)
  public readonly logger: ILogger

  @Inject(ID_GENERATOR)
  private readonly idGenerator: IIDGenerator

  @Inject(QUEUE_PUBLISHER)
  private readonly queue: IQueue

  constructor(repository: IExampleRepository, logger: ILogger, idGenerator: IIDGenerator, queue: IQueue) {
    this.repository = repository
    this.logger = logger
    this.idGenerator = idGenerator
    this.queue = queue
  }

  /**
   * UseCase executer
   *
   * @param example - New example to create
   * @returns The new example created
   */
  async execute({
    name,
    lastName,
    phone,
    hobbies,
  }: {
    name: string
    lastName: string
    phone: string
    hobbies: string[]
  }): Promise<Example> {
    this.logger.info('Creating a new example')
    // REPOSITORY
    const nameAlreadyExist = await this.repository.getByName(name)
    // BUSINESS EXCEPTIONS
    if (!name) throw new PropertyRequiredError('name')
    if (nameAlreadyExist) throw new AlreadyExistsError()
    // REPOSITORY
    const newExample = new Example({
      _id: this.idGenerator.generate(),
      name,
      lastName,
      phone,
      hobbies,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    await this.repository.save(newExample)

    this.logger.info('New example created succesfully')

    this.queue.publish(MESSAGE_PUBLISHED_TOPIC, JSON.stringify(newExample), {
      version: '1',
      companyId: '1',
      collection: 'example',
      operation: MessageAttributeOperation.CREATE,
    })

    return newExample
  }
}
