const { TodoRepository } = require('../modules/todo/todo.repository')
const { makeTodo } = require('../modules/todo/todo.model')

/**
 * @description
 * Add a new Todo document and return it
 * 
 * @param {DataSource} datasource 
 * @param {any} todoInfo 
 * 
 * @returns {Todo} the Todo created
 */
exports.addTodo = async (datasource, todoInfo) => {
  const todo = makeTodo(todoInfo)

  const todoRepository = new TodoRepository(datasource)

  return todoRepository.insert(todo)

  /*
  // Another Option is build the repository response, for example preformat the Todo result

  const newTodo = await todoRepository.insert(todo)
  return makeTodo(newTodo)
  */
}