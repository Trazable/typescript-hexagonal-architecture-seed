const router = require('express').Router()
const examplesRouter = require('./examples.router')

const apiRouter = (dependencies) => {
  // Inyectamos las dependencias al router de student
  router.use('/examples', examplesRouter(dependencies))

  return router
}


module.exports = apiRouter
