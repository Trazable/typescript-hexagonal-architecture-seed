const router = require('express').Router()
const {
  postTodo,
  getTodos,
} = require('../controllers/todo.controller')



/**
 * Todo router
 * /todos
 */
router
  .route('/')
  .get(getTodos)
  .post(postTodo)


module.exports = router
