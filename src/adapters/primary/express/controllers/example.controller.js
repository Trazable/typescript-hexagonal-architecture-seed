const { OK, CREATED } = require('http-status-codes')
const { loggerController: logger } = require('../../../../utils/logger')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../../interactors/example')

class ExampleController {
  /**
   *
   * @param {ExampleManager} exampleManager
   */
  constructor (exampleManager) {
    this.exampleManager = exampleManager

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
      logger.error(error.stack)
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
      logger.error(error.stack)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async changeName (req, res) {
    try {
      await this.exampleManager.changeName(req.body)
      res.status(OK).end()
    } catch (error) {
      logger.error(error.stack)
    }
  }
}

module.exports = ExampleController
