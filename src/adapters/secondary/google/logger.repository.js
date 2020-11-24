const Logger = require('../../../ports/logger')
const {
  Container,
  transports,
  format,
} = require('winston')

const {
  combine,
  timestamp,
  label,
  json,
  splat,
  prettyPrint,
} = format

const { LOGGER_LABELS } = require('../../../constants')
const { LoggingWinston } = require('@google-cloud/logging-winston')

class GoogleWinstonLogger extends Logger {
  constructor () {
    super()
    this.loggerContainer = new Container()
    this.developmentTransport = this.#initializeDevelopmentTransport()
    this.productionTransport = this.#initializeProductionTransport()
    this.#initializeLoggers()
  }

  /**
 *
 */
  #initializeDevelopmentTransport () {
    // Transports sets
    const developmentTransports = [
      new transports.Console({
        level: 'debug',
      }),
    ]

    return developmentTransports
  }

  /**
   *
   */
  #initializeProductionTransport () {
    const productionTransports = [
      ...this.developmentTransport,
      new LoggingWinston({
        level: 'debug',
      }),
    ]

    return productionTransports
  }

  #initializeLoggers () {
    // Dynamically creates all loggers using the labels defined above
    for (const key in LOGGER_LABELS) {
      this.loggerContainer.add(LOGGER_LABELS[key], {
        format: process.env.NODE_ENV === 'development'
          ? combine(
              label({ label: LOGGER_LABELS[key].toLowerCase() }),
              splat(),
              timestamp(),
              json(),
              prettyPrint(),
            )
          : combine(
            label({ label: LOGGER_LABELS[key].toLowerCase() }),
            splat(),
            timestamp(),
            json(),
          ),
        transports: process.env.NODE_ENV === 'production'
          ? this.productionTransport
          : this.developmentTransport,
      })
    }
  }

  // USE CASE CONTAINERS

  /**
   * @return {Container}
   */
  getAddUseCaseContainer () {
    return this.loggerContainer.get(LOGGER_LABELS.ADD_USE_CASE)
  }

  /**
   * @return {Container}
   */
  getGetAllUseCaseContainer () {
    return this.loggerContainer.get(LOGGER_LABELS.GET_ALL_USE_CASE)
  }

  /**
   * @return {Container}
   */
  getChangeNameUseCaseContainer () {
    return this.loggerContainer.get(LOGGER_LABELS.CHANGE_NAME_USE_CASE)
  }

  // DATA SOURCE CONTAINER

  /**
   * @return {Container}
   */
  getDataSourceContainer () {
    return this.loggerContainer.get(LOGGER_LABELS.DATA_SOURCE)
  }

  // DEFAULT

  /**
   * @return {Container}
   */
  getDefaultContainer () {
    return this.loggerContainer.get(LOGGER_LABELS.DEFAULT)
  }
}

module.exports = GoogleWinstonLogger
