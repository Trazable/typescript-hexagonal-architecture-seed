import { Inject, Service } from 'typedi'
import { USE_CASES_LOGGER } from '../../constants'
import { ILogger } from '../../ports/logger'

/**
 * Log Creations UseCase
 * @namespace Example
 */

@Service()
export class ShowMessage {
  @Inject(USE_CASES_LOGGER.SHOW_MESSAGE_USE_CASE_LOGGER)
  public readonly logger: ILogger

  constructor(logger: ILogger) {
    this.logger = logger
  }

  /**
   * UseCase executer
   *
   * @param data - New example to create
   * @returns The new example created
   */
  async execute(data: unknown): Promise<void> {
    this.logger.info(JSON.stringify(data, null, 2))
  }
}
