
const ExampleController = require('../controllers/example.controller.js')
const express = require('express')


class ExampleRoutes {
  constructor (exampleManager) {
    this.exampleManager = exampleManager
  }

  setupExampleRoutes (app) {
    const router = express.Router()
    const exampleController = new ExampleController(this.exampleManager)

    router.route('/examples/')
      .post(exampleController.add)
      .get(exampleController.getAll)

    router.route('/examples/')
      .patch(exampleController.update)

    app.use(router)
  }
}

module.exports = ExampleRoutes
