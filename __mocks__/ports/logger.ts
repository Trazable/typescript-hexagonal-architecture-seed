/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogger } from '../../src/ports/logger'

export class FakeLogger implements ILogger {
  info(message: string): void {
    throw new Error('Method not implemented.')
  }

  error(message: string): void {
    throw new Error('Method not implemented.')
  }

  warn(message: string): void {
    throw new Error('Method not implemented.')
  }

  setCorrelationId(correlationId: string | undefined): void {
    throw new Error('Method not implemented.')
  }

  getCorrelationId(): string | undefined {
    throw new Error('Method not implemented.')
  }
}
