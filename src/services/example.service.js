const TodoRepository = require('../repositories/todo.repository')

function ExampleService (dataSource) {
  this.repository = new TodoRepository(dataSource)
}

ExampleService.prototype.getAll = function () {
  return this.repository.getAll()
}

ExampleService.prototype.save = function (object) {
  // Business logic
  object = { ...object, param: 'modified data'}
  return this.repository.save(object)
}

module.exports = ExampleService
