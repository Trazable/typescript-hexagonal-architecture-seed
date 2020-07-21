/**
 * Todo Repository initialization
 * 
 * @param {dataSource} dataSource 
 */
function TodoRepository (dataSource) {
  this.dataSource = dataSource

  if (dataSource.getAll === undefined) {
    throw new Error('You must implement getAll in your dataSource')
  }
  if (dataSource.save === undefined) {
    throw new Error('You must implement save in your dataSource')
  }
}

/**
 * Insert new Todo
 * 
 * @param {Todo} todo 
 * 
 * @returns {Todo} Todo
 */
TodoRepository.prototype.save = function (todo) {
  return this.dataSource.save(todo)
}

/**
 * Get all Todos
 * 
 * @returns {Todo[]} Todos
 */
TodoRepository.prototype.getAll = function () {
  return this.dataSource.getAll()
}

module.exports = TodoRepository