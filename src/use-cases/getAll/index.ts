import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'

/**
 * Get all examples UseCase
 * @namespace Example
 */
export class GetAll {
  private readonly repository: IExampleRepository
  public readonly logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
  }

  /**
   * UseCase executer
   *
   * @returns All the examples
   */
  async execute(): Promise<Example[]> {
    this.logger.info('Retrieving the examples')
    return this.repository.getAll()
  }
}
