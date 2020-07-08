/**
 * @constant COLLECTION Todo Database Collection Name
 */
const COLLECTION = 'todo'

/**
 * Todo Repository initialization
 * 
 * @param {DataSource} datasource 
 */
function TodoRepository (datasource) {
  this.datasource = datasource
}

/**
 * Insert new Todo
 * 
 * @param {Todo} todo 
 * 
 * @returns {Todo} Todo
 */
TodoRepository.prototype.insert = function (todo) {
  return this.datasource.insert(COLLECTION, todo)
}

/**
 * Get all Todos
 * 
 * @returns {Todo[]} Todos
 */
TodoRepository.prototype.getAll = function () {
  return this.datasource.getAll(COLLECTION)
}

exports.TodoRepository = TodoRepository