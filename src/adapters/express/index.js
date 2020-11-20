const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { loggerController: logger } = require('../../utils/logger')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../interactors/example')
const ExampleRoutes = require('../../adapters/express/routes/examples.router')


/*
 * Express configuration
 */

class ExpressApi {
  /**
   *
   * @param {ExampleManager} exampleManager
   */

  constructor (exampleManager) {
    this.exampleManager = exampleManager
    this.#serverConfiguration()
    this.#setupRoutes()
  }

  start (port = process.env.SERVER_PORT) {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      logger.info(`Server is listening on port ${port}`)
    })
  }

  #serverConfiguration () {
    app.use(bodyParser.json())
    app.use(morgan('dev'))
  }

  #setupRoutes () {
    // Example routes
    new ExampleRoutes(this.exampleManager).setupExampleRoutes(app)
  }
}

module.exports = ExpressApi
