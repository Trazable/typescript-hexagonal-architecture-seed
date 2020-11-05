const ExampleService = require('../../../../services/example.service')
const { loggerController: logger } = require('../../../../utils/logger')
const {
  OK,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes')

// Dependency injection
module.exports = (dependencies) => {
  // Extract needed dependencies to use in the service
  const { exampleRepository } = dependencies

  const save = async (req, res) => {
    try {
      // Inject the comming repository into the service
      // In case you want more repositories just add them as params
      // Example => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.save(req.body)

      return res.status(OK).json(response)
    } catch (error) {
      logger.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }

  const getAll = async (req, res) => {
    try {
      // Inject the comming repository into the service
      // In case you want more repositories just add them as params
      // Example => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.getAll()

      return res.status(OK).json(response)
    } catch (error) {
      logger.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }

  const update = async (req, res) => {
    try {
      // Inject the comming repository into the service
      // In case you want more repositories just add them as params
      // Example => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.update(req.params.id, req.body)

      return res.status(OK).json(response)
    } catch (error) {
      logger.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }


  return { save, getAll, update }
}
