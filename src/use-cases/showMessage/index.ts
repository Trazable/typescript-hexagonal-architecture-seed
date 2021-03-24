import { ILogger } from '../../ports/logger'

/**
 * Log Creations UseCase
 * @namespace Example
 */
export class ShowMessage {
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
