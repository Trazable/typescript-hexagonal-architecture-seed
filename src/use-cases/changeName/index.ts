import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { NotFoundError } from '../../exceptions/not-found'
import { ILogger } from '../../ports/logger'

/**
 * Change an example name by id UseCase
 * @namespace Example
 */
export class ChangeName {
  private readonly repository: IExampleRepository
  private readonly logger: ILogger

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
    // REPOSITORY
    // Update the entity
    await this.repository.update(example)

    this.logger.info(`Changed the name from the example ${name}`)
    return example
  }

  getUseCaseLogger(): ILogger {
    return this.logger
  }
}
