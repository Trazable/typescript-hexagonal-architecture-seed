const AddUseCase = require('./add')
const ChangeNameUseCase = require('./changeName')
const GetAllUseCase = require('./getAll')

// eslint-disable-next-line no-unused-vars
const ExampleRepository = require('../../repositories/example.repository')

class ExampleManager {
  /**
   *
   * @param {ExampleRepository} repository
   * @param {{ addUseCaseLogger: any, getAllUseCaseLogger: any, changeNameUseCaseLogger: any }} containerLoggers
   */
  constructor (repository, containerLoggers) {
    this.repository = repository

    this.add = new AddUseCase(this.repository, containerLoggers.addUseCaseLogger).execute
    this.changeName = new ChangeNameUseCase(this.repository, containerLoggers.changeNameUseCaseLogger).execute
    this.getAll = new GetAllUseCase(this.repository, containerLoggers.getAllUseCaseLogger).execute
  }
}

module.exports = ExampleManager
