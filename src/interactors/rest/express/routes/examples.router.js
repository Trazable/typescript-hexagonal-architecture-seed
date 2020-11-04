
const ExampleController = require('../controllers/example.controller.js')
const express = require('express')

const ExamplesRouter = (dependencies) => {
  // Inyectamos las dependencias al controlador de example
  const exampleController = ExampleController(dependencies)
  const router = express.Router()

  router.route('/')
    .post(exampleController.save)

  return router
}

module.exports = ExamplesRouter
