
const StudentController = require('../controllers/student.controller.js')
const express = require('express')

const StudentsRouter = (dependencies) => {
  // Inyectamos las dependencias al controlador de student
  const studentController = StudentController(dependencies)
  const router = express.Router()

  router.route('/')
    .post(studentController.save)

  return router
}

module.exports = StudentsRouter
