// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

/**
 * Port to manage logger tasks
 * @namespace logger
 */
export interface ILogger {
  /**
   * Log an info message
   *
   * @param message - Message to log
   */
  info(message: string): void

  /**
   * Log an error message
   *
   * @param message - Message to log
   */
  error(message: string): void

  /**
   * Log a warning message
   *
   * @param message - Message to log
   */
  warn(message: string): void

  /**
   *
   * Set the correlationId gived by the input data
   * @param correlationId
   */
  setCorrelationId(correlationId: string | undefined): void

  /**
   * Get the correlationId saved in the logger to send to another microservice
   */
  getCorrelationId(): string | undefined
}
