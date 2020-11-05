const ExampleService = require('../../../../services/example.service')
const { loggerController: logger } = require('../../../../utils/logger')
const {
  OK,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes')

// Dependency injection
module.exports = (dependencies) => {
  /* Extraemos las dependencias necesarias para utilizarlas en el servicio
  * En caso de querer mas dependencias solo habria que extraerlas e inyectar tantas se quiera en el servicio.
  */
  const { exampleRepository } = dependencies

  const save = async (req, res) => {
    try {
      // Inyectamos en el servicio el repositorio de example que ha venido desde el inicio de la aplicación declarado en el fichero config/projectdependencies.js
      // Si quisieramos mas repositorios solo habria que añadirlos como parametros
      // Ejemplo => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.save(req.body)

      return res.status(OK).json(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      logger.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }

  const getAll = async (req, res) => {
    try {
      // Inyectamos en el servicio el repositorio de example que ha venido desde el inicio de la aplicación declarado en el fichero config/projectdependencies.js
      // Si quisieramos mas repositorios solo habria que añadirlos como parametros
      // Ejemplo => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.getAll()

      return res.status(OK).json(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      logger.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }


  return { save, getAll }
}
