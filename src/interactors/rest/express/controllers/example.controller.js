const ExampleService = require('../../../../services/example.service')

// Dependency injection
module.exports = (dependencies) => {
  /* Extraemos las dependencias necesarias para utilizarlas en el servicio
  * En caso de querer mas dependencias solo habria que extraerlas e inyectar tantas se quiera en el servicio.
  */
  const { exampleRepository } = dependencies

  const save = async (req, res, next) => {
    try {
      // Inyectamos en el servicio el repositorio de example que ha venido desde el inicio de la aplicación declarado en el fichero config/projectdependencies.js
      // Si quisieramos mas repositorios solo habria que añadirlos como parametros
      // Ejemplo => const exampleService = ExampleService(exampleMongoRepository, pubsubRepository, exampleMysqlRepository, externalServiceRepository)
      const exampleService = ExampleService(exampleRepository)

      const response = await exampleService.save(req.body)

      return res.status(200).json(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return res.status(500).json(error)
    }
  }


  return { save }
}
