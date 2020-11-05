/*
 * Express configuration as REST interactor
 */
const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { NO_CONTENT } = require('http-status-codes')
const routes = require('./routes')
const dependencies = require('../../../dependencies')
const { loggerController: logger } = require('../../../utils/logger')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))

// Router
// Cascade dependency injection from the app's start
app.use('/ping', (req, res) => {
  res.status(NO_CONTENT).end()
})
app.use('/', routes(dependencies))


// Listen for requests
const port = 8080
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})


module.exports = app
