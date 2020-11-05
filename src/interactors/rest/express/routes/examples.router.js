
const ExampleController = require('../controllers/example.controller.js')
const express = require('express')

const ExamplesRouter = (dependencies) => {
  // Inject dependencies into the controller
  const exampleController = ExampleController(dependencies)
  const router = express.Router()

  router.route('/')
    .post(exampleController.save)
    .get(exampleController.getAll)

  return router
}

module.exports = ExamplesRouter
