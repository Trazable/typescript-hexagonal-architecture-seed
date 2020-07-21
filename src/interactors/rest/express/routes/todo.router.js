const router = require('express').Router()
const {
  getAll,
  save,
} = require('../controllers/todo.controller')



/**
 * Todo router
 * /todos
 */
router
  .route('/')
  .get(getAll)
  .post(save)


module.exports = router
