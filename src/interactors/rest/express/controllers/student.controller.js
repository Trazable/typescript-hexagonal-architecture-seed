const StudentService = require('../../../../services/student.service')

// Dependency injection
module.exports = (dependencies) => {
  /* Extraemos las dependencias necesarias para utilizarlas en el servicio
  * En caso de querer mas dependencias solo habria que extraerlas e inyectar tantas se quiera en el servicio.
  */
  const { studentRepository } = dependencies

  const save = async (req, res, next) => {
    try {
      // Inyectamos en el servicio el repositorio de student que ha venido desde el inicio de la aplicación declarado en el fichero config/projectdependencies.js
      // Si quisieramos mas repositorios solo habria que añadirlos como parametros
      // Ejemplo => const studentService = StudentService(studentMongoRepository, pubsubRepository, studentMysqlRepository, externalServiceRepository)
      const studentService = StudentService(studentRepository)

      const response = await studentService.save(req.body)

      return res.status(200).json(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return res.status(500).json(error)
    }
  }


  return { save }
}
