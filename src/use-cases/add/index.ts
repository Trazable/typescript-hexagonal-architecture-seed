import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ObjectId } from 'mongodb' // ONLY EXAMPLE USE
import { AlreadyExistsError } from '../../exceptions/already-exists'
import { PropretyIsRequiredError } from '../../exceptions/property-is-required'
import { ILogger } from '../../ports/logger'

/**
 * Add new Example UseCase
 * @namespace Example
 */
export class Add {
  repository: IExampleRepository
  logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
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
    if (!example.name) throw new PropretyIsRequiredError('name')
    if (nameAlreadyExist) throw new AlreadyExistsError()
    // REPOSITORY
    const newExample = new Example({ ...example, id: new ObjectId().toHexString(), createdAt: new Date() })

    await this.repository.save(newExample)

    this.logger.info('New example created succesfully')

    return newExample
  }

  getUseCaseLogger(): ILogger {
    return this.logger
  }
}
