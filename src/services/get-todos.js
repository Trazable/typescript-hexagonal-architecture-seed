const { TodoRepository } = require('../repositories/todo.repository')
// const { makeTodo } = require('../entities/todo.entity')

/**
 * @description
 * Get all Todos
 * @param {DataSource} datasource
 * @returns {Todo[]} the Todos
 */
exports.getTodos = async (datasource) => {
  const todoRepository = new TodoRepository(datasource)

  return todoRepository.getAll()

  /*
  // Another Option is build the repository response, for example preformat the todos result

  const todos = await todoRepository.getAll()
  return todos.map(todo => makeTodo(todo))
  */
}
