
const ExampleController = require('../controllers/example.controller.js')
// eslint-disable-next-line no-unused-vars
const ExampleManager = require('../../../../interactors/example')


class ExampleRoutes {
  /**
   *
   * @param {ExampleManager} exampleManager
   */
  constructor (exampleManager) {
    this.exampleManager = exampleManager
  }

  setupExampleRoutes (router) {
    const exampleController = new ExampleController(this.exampleManager)

    router.route('/examples/')
      .post(exampleController.add)
      .get(exampleController.getAll)

    router.route('/examples/changeName/:id')
      .patch(exampleController.changeName)

    return router
  }
}

module.exports = ExampleRoutes
