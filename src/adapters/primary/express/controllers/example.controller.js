const { OK, CREATED } = require('http-status-codes')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../../interactors/example')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')

const ManageError = require('./manage-error')

class ExampleController {
  /**
   *
   * @param {ExampleManager} exampleManager
   * @param {{ addUseCaseLogger: any, getAllUseCaseLogger: any, changeNameUseCaseLogger: any }} containerLoggers
   */
  constructor (exampleManager, containerLoggers) {
    this.exampleManager = exampleManager
    this.containerLoggers = containerLoggers

    // LOGGER FOR EACH USE CASE
    /**
     * @type {winston.Logger}
     */
    this.addLogger = this.containerLoggers.addUseCaseLogger
    /**
     * @type {winston.Logger}
     */
    this.getAllLogger = this.containerLoggers.getAllUseCaseLogger
    /**
     * @type {winston.Logger}
     */
    this.changeNameLogger = this.containerLoggers.changeNameUseCaseLogger
    // BIND SCOPE
    this.add = this.add.bind(this)
    this.getAll = this.getAll.bind(this)
    this.changeName = this.changeName.bind(this)
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async add (req, res) {
    try {
      await this.exampleManager.add(req.body)
      res.status(CREATED).end()
    } catch (error) {
      this.addLogger.error(error.stack)
      ManageError(error, res)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async getAll (req, res) {
    try {
      res.status(OK).json(await this.exampleManager.getAll())
    } catch (error) {
      this.getAllLogger.error(error.stack)
      ManageError(error, res)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async changeName (req, res) {
    try {
      await this.exampleManager.changeName(req.params.id, req.body)
      res.status(OK).end()
    } catch (error) {
      this.changeNameLogger.error(error.stack)
      ManageError(error, res)
    }
  }
}

module.exports = ExampleController
