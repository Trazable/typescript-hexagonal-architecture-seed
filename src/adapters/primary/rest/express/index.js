const app = require('express')()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// eslint-disable-next-line no-unused-vars
const ExampleController = require('./controllers/example.controller')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')
const { OK } = require('http-status-codes')
// eslint-disable-next-line no-unused-vars
const Add = require('../../../../use-cases/add')
// eslint-disable-next-line no-unused-vars
const GetAll = require('../../../../use-cases/getAll')
// eslint-disable-next-line no-unused-vars
const ChangeName = require('../../../../use-cases/changeName')

/*
 * Express configuration
 */

class ExpressApi {
  /**
   *
   * @param {{ addUseCase: Add, getAllUseCase: GetAll, changeNameUseCase: ChangeName }} useCases
   *
   */

  constructor({ addUseCase, getAllUseCase, changeNameUseCase }, logger) {
    this.addUseCase = addUseCase
    this.getAllUseCase = getAllUseCase
    this.changeNameUseCase = changeNameUseCase
    this.logger = logger

    this.#serverConfiguration()
    this.#setupRoutes()
  }

  /**
   *
   * @param {number} port
   */
  start(port = process.env.SERVER_PORT) {
    app.listen(port, () => {
      this.logger.info(`Server is listening on port ${port}`)
    })
  }

  #serverConfiguration() {
    app.use(bodyParser.json())
    app.use(morgan('dev'))
  }

  #setupRoutes() {
    const router = express.Router()

    // Ping route
    router.route('/ping').get((req, res) => {
      res.status(OK).end()
    })

    const exampleController = new ExampleController({
      addUseCase: this.addUseCase,
      getAllUseCase: this.getAllUseCase,
      changeNameUseCase: this.changeNameUseCase,
    })

    router.route('/examples/').post(exampleController.add).get(exampleController.getAll)

    router.route('/examples/changeName/:id').patch(exampleController.changeName)

    app.use(router)
  }
}

module.exports = ExpressApi
