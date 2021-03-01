import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'

export class GetAll {
  repository: IExampleRepository
  logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
  }

  /**
   *
   * @return {Promise<Example[]>}
   */
  async execute(): Promise<Example[]> {
    this.logger.info('Retrieving the examples')
    return this.repository.getAll()
  }

  getUseCaseLogger(): ILogger {
    return this.logger
  }
}
