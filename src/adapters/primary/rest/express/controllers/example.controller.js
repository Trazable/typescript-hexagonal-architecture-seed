const { OK, CREATED } = require('http-status-codes')
// eslint-disable-next-line no-unused-vars
const winston = require('winston')
// eslint-disable-next-line no-unused-vars
const Add = require('../../../../../use-cases/add')
// eslint-disable-next-line no-unused-vars
const GetAll = require('../../../../../use-cases/getAll')
// eslint-disable-next-line no-unused-vars
const ChangeName = require('../../../../../use-cases/changeName')

const ManageError = require('./manage-error')

class ExampleController {
  /**
   *
   * @param {{ addUseCase: Add, getAllUseCase: GetAll, changeNameUseCase: ChangeName }} useCases
   *
   */
  constructor ({ addUseCase, getAllUseCase, changeNameUseCase }) {
    this.addUseCase = addUseCase
    this.getAllUseCase = getAllUseCase
    this.changeNameUseCase = changeNameUseCase

    // LOGGER FOR EACH USE CASE
    /**
     * @type {winston.Logger}
     */
    this.addLogger = this.addUseCase.getLoggerContainer()
    /**
     * @type {winston.Logger}
     */
    this.getAllLogger = this.getAllUseCase.getLoggerContainer()
    /**
     * @type {winston.Logger}
     */
    this.changeNameLogger = this.changeNameUseCase.getLoggerContainer()

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
    const example = req.body
    try {
      await this.addUseCase.execute(example)
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
      res.status(OK).json(await this.getAllUseCase.execute())
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
    const { id } = req.params
    const { name } = req.body
    try {
      await this.changeNameUseCase.execute(id, name)
      res.status(OK).end()
    } catch (error) {
      this.changeNameLogger.error(error.stack)
      ManageError(error, res)
    }
  }
}

module.exports = ExampleController
