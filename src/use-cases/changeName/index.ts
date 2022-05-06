import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { NotFoundError } from '../../exceptions/not-found'
import { ILogger } from '../../ports/logger'
import { Inject, Service } from 'typedi'
import { EXAMPLE_REPOSITORY, USE_CASES_LOGGER } from '../../constants'

/**
 * Change an example name by id UseCase
 * @namespace Example
 */

@Service()
export class ChangeName {
  @Inject(EXAMPLE_REPOSITORY)
  private readonly repository: IExampleRepository

  @Inject(USE_CASES_LOGGER.CHANGE_NAME_USE_CASE_LOGGER)
  public readonly logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
  }

  /**
   * UseCase executer
   *
   * @param id - Example id to update
   * @param name - New example name
   * @returns The example updated
   */
  async execute(id: string, name: string): Promise<Example> {
    this.logger.info(`Changing the name of the example ${id} to ${name}`)
    // REPOSITORY
    // Retrieve the entity with all data
    const example = await this.repository.getById(id)

    // BUSINESS EXCEPTIONS
    if (!example) throw new NotFoundError()
    // ENTITY LOGIC
    // Change only the necessary field in the useCase
    example.changeName(name)
    example.updatedAt = new Date()
    // REPOSITORY
    // Update the entity
    await this.repository.update(example)

    this.logger.info(`Changed the name from the example ${name}`)
    return example
  }
}
