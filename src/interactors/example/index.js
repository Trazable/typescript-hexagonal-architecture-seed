const AddUseCase = require('./add')
const UpdateUseCase = require('./update')
const GetAllUseCase = require('./getAll')

// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../repositories/example.repository')

class ExampleManager {
  /**
   *
   * @param {ExampleRepository} repository
   */
  constructor (repository) {
    this.repository = repository

    this.add = new AddUseCase(this.repository).execute
    this.update = new UpdateUseCase(this.repository).execute
    this.getAll = new GetAllUseCase(this.repository).execute
  }
}

module.exports = ExampleManager
