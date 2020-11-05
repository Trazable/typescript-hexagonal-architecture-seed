const router = require('express').Router()
const examplesRouter = require('./examples.router')

const apiRouter = (dependencies) => {
  // Inject dependencies into the router
  router.use('/examples', examplesRouter(dependencies))

  return router
}


module.exports = apiRouter
