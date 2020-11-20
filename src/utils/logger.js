const {
  Container,
  transports,
  format,
} = require('winston')
const { LoggingWinston } = require('@google-cloud/logging-winston')

const {
  combine,
  timestamp,
  label,
  json,
  splat,
  prettyPrint,
} = format


// Add all labels here
const loggerLabels = {
  DEFAULT: 'DEFAULT',
  ROUTER: 'ROUTER',
  CONTROLLER: 'CONTROLLER',
  SERVICE: 'SERVICE',
  DATA_SOURCE: 'DATA_SOURCE',
}


// Transports sets
const developmentTransports = [
  new transports.Console({
    level: 'debug',
  }),
]

const productionTransports = [
  ...developmentTransports,
  new LoggingWinston({
    level: 'debug',
  }),
]


const loggerContainer = new Container()


// Dynamically creates all loggers using the labels defined above
for (const key in loggerLabels) {
  loggerContainer.add(loggerLabels[key], {
    format: process.env.NODE_ENV === 'development'
      ? combine(
          label({ label: loggerLabels[key].toLowerCase() }),
          splat(),
          timestamp(),
          json(),
          prettyPrint(),
        )
      : combine(
        label({ label: loggerLabels[key].toLowerCase() }),
        splat(),
        timestamp(),
        json(),
      ),
    transports: process.env.NODE_ENV === 'production'
      ? productionTransports
      : developmentTransports,
  })
}


module.exports = {
  loggerLabels,
  logger: loggerContainer.get(loggerLabels.DEFAULT),
  loggerRouter: loggerContainer.get(loggerLabels.ROUTER),
  loggerController: loggerContainer.get(loggerLabels.CONTROLLER),
  loggerService: loggerContainer.get(loggerLabels.SERVICE),
  loggerDataSource: loggerContainer.get(loggerLabels.DATA_SOURCE),
}
