const app = require('express')()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { loggerController: logger } = require('../../../utils/logger')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../interactors/example')
const ExampleRoutes = require('./routes/examples.router')


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

  /**
   *
   * @param {number} port
   */
  start (port = process.env.SERVER_PORT) {
    app.listen(port, () => {
      logger.info(`Server is listening on port ${port}`)
    })
  }

  #serverConfiguration () {
    app.use(bodyParser.json())
    app.use(morgan('dev'))
  }

  #setupRoutes () {
    const router = express.Router()

    // Example routes
    const exampleRoutes = new ExampleRoutes(this.exampleManager)
    app.use(exampleRoutes.setupExampleRoutes(router))
  }
}

module.exports = ExpressApi
