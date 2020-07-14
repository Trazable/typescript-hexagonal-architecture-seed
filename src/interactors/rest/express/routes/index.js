const router = require('express').Router()
const todoRoutes = require('./todo.routes')
const { makeExpressCallback } = require('../express-callback')


for (const route of todoRoutes) {
  // router.METHOD(PATH, ...HANDLERS)
  router[route.method.toLowerCase()](route.path, ...route.handlers.map(handler => makeExpressCallback(handler)))
}


module.exports = router
