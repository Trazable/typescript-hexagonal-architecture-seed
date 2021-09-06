import { Container, transports, format, Logform, Logger } from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'

import { ILogger } from '../../../ports/logger'
import { Config } from '../../../config'

const { combine, timestamp, label, json, splat, prettyPrint } = format

export class GoogleWinstonLogger implements ILogger {
  private readonly loggerName: string
  private readonly developmentTransport: transports.ConsoleTransportInstance[]
  private readonly productionTransport: (transports.ConsoleTransportInstance | LoggingWinston)[]
  private container: Logger
  private correlationId?: string

  constructor(loggerName: string) {
    this.developmentTransport = this.initializeDevelopmentTransport()
    this.productionTransport = this.initializeProductionTransport()
    this.loggerName = loggerName
    this.correlationId = undefined
    this.container = new Container().add(this.loggerName, {
      defaultMeta: {
        correlationId: this.correlationId,
        microservice: 'project_name',
      },
      format: this.winstonLoggerFormatter(),
      transports: Config.NODE_ENV === 'production' ? this.productionTransport : this.developmentTransport,
    })
  }

  info(message: string): void {
    this.container.defaultMeta = { ...this.container.defaultMeta, correlationId: this.correlationId }
    this.container.info(message)
  }

  error(message: string): void {
    this.container.defaultMeta = { ...this.container.defaultMeta, correlationId: this.correlationId }
    this.container.error(message)
  }

  warn(message: string): void {
    this.container.defaultMeta = { ...this.container.defaultMeta, correlationId: this.correlationId }
    this.container.warn(message)
  }

  private initializeDevelopmentTransport() {
    // Transports sets
    const developmentTransports = [
      new transports.Console({
        level: 'debug',
      }),
    ]

    return developmentTransports
  }

  private initializeProductionTransport() {
    const productionTransports = [
      ...this.developmentTransport,
      new LoggingWinston({
        level: 'debug',
        logName: 'project_name',
      }),
    ]

    return productionTransports
  }

  private winstonLoggerFormatter(): Logform.Format {
    return combine(label({ label: this.loggerName }), splat(), timestamp(), json(), prettyPrint())
  }

  setCorrelationId(correlationId: string | undefined): void {
    this.correlationId = correlationId
  }

  getCorrelationId(): string | undefined {
    return this.correlationId
  }
}
