const TodoRepository = require('../repositories/todo.repository')

function ExampleService (dataSource) {
  this.repository = new TodoRepository(dataSource)
}

ExampleService.prototype.getAll = function () {
  return this.repository.getAll()
}

module.exports = ExampleService
