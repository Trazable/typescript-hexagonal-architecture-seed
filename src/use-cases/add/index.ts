import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { AlreadyExistsError } from '../../exceptions/already-exists'
import { PropertyRequiredError } from '../../exceptions/property-required'
import { ILogger } from '../../ports/logger'
import { IIDGenerator } from '../../ports/id-generator'
import { IQueue } from '../../ports/queue'
import { EXAMPLE_CREATED_EVENT } from '../../constants'

/**
 * Add new Example UseCase
 * @namespace Example
 */
export class Add {
  private readonly repository: IExampleRepository
  public readonly logger: ILogger
  private readonly idGenerator: IIDGenerator
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
  async execute(example: Example): Promise<Example> {
    this.logger.info('Creating a new example')
    // REPOSITORY
    const nameAlreadyExist = await this.repository.getByName(example.name)
    // BUSINESS EXCEPTIONS
    if (!example.name) throw new PropertyRequiredError('name')
    if (nameAlreadyExist) throw new AlreadyExistsError()
    // REPOSITORY
    const newExample = new Example({ ...example, _id: this.idGenerator.generate(), createdAt: new Date() })

    await this.repository.save(newExample)

    this.logger.info('New example created succesfully')

    this.queue.publish(EXAMPLE_CREATED_EVENT, JSON.stringify(newExample))

    return newExample
  }
}
