
const ExampleController = require('../controllers/example.controller.js')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../../interactors/example')


class ExampleRoutes {
  /**
   *
   * @param {ExampleManager} exampleManager
   * @param {{ addUseCaseLogger: any, getAllUseCaseLogger: any, changeNameUseCaseLogger: any }} containerLoggers
   */
  constructor (exampleManager, containerLoggers) {
    this.exampleManager = exampleManager
    this.containerLoggers = containerLoggers
  }

  setupExampleRoutes (router) {
    const exampleController = new ExampleController(this.exampleManager, this.containerLoggers)

    router.route('/examples/')
      .post(exampleController.add)
      .get(exampleController.getAll)

    router.route('/examples/changeName/:id')
      .patch(exampleController.changeName)

    return router
  }
}

module.exports = ExampleRoutes
