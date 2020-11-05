
const ExampleController = require('../controllers/example.controller.js')
const express = require('express')

const ExamplesRouter = (dependencies) => {
  // Inject dependencies into the controller
  const exampleController = ExampleController(dependencies)
  const router = express.Router()

  router.route('/')
    .post(exampleController.save)
    .get(exampleController.getAll)

  router.route('/:id')
    .post(exampleController.update)

  return router
}

module.exports = ExamplesRouter
