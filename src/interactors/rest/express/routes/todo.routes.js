const {
  postTodo,
  getTodos,
} = require('../handlers/todo.handler')


/**
 * Todo routes
 */
const routes = [
  {
    method: 'GET',
    path: '/todos/',
    handlers: [getTodos]
  },
  {
    method: 'POST',
    path: '/todos/',
    handlers: [postTodo]
  }
]

module.exports = routes
