import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'
import { Inject, Service } from 'typedi'
import { EXAMPLE_REPOSITORY, USE_CASES_LOGGER } from '../../constants'

/**
 * Get all examples UseCase
 * @namespace Example
 */

@Service()
export class GetAll {
  @Inject(EXAMPLE_REPOSITORY)
  private readonly repository: IExampleRepository

  @Inject(USE_CASES_LOGGER.GET_ALL_USE_CASE_LOGGER)
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
