const app = require('express')()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../interactors/example')
const ExampleRoutes = require('./routes/examples.router')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')
const { OK } = require('http-status-codes')


/*
 * Express configuration
 */

class ExpressApi {
  /**
   *
   * @param {ExampleManager} exampleManager
   * @param {{ addUseCaseLogger: any, getAllUseCaseLogger: any, changeNameUseCaseLogger: any, defaultLogger: any}} containerLoggers
   */

  constructor (exampleManager, containerLoggers) {
    this.exampleManager = exampleManager
    this.containerLoggers = containerLoggers

    /**
     * @type {winston.Logger}
     */
    this.logger = this.containerLoggers.defaultLogger

    this.#serverConfiguration()
    this.#setupRoutes()
  }

  /**
   *
   * @param {number} port
   */
  start (port = process.env.SERVER_PORT) {
    app.listen(port, () => {
      this.logger.info(`Server is listening on port ${port}`)
    })
  }

  #serverConfiguration () {
    app.use(bodyParser.json())
    app.use(morgan('dev'))
  }

  #setupRoutes () {
    const router = express.Router()

    // Ping route
    app.get('/ping', (req, res) => { res.status(OK).end() })

    // Example routes
    const exampleRoutes = new ExampleRoutes(this.exampleManager, this.containerLoggers)
    app.use(exampleRoutes.setupExampleRoutes(router))
  }
}

module.exports = ExpressApi
