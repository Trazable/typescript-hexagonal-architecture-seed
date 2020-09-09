const router = require('express').Router()
const studentsRouter = require('./students.router')

const apiRouter = (dependencies) => {
  // Inyectamos las dependencias al router de student
  router.use('/students', studentsRouter(dependencies))

  return router
}


module.exports = apiRouter
