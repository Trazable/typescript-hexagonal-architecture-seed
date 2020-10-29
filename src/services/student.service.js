
// STUDENT SERVICE
const StudentRepository = require('../repositories/student.repository')

// Recogemos la dependencia inyectada desde el controlador
/**
 *
 * @param {StudentRepository} studentRepository
 */
module.exports = (studentRepository) => {
  /**
   *
   * @param {*} student
   * @return {Promise<T>}
   */
  const save = async (studentData) => {
    // Business logic

    // Creamos la estructura en run-time que sera almacenada por primera vez en el guardado de la base de datos.
    // En este ejemplo, si studentData no tiene name, age y hobbies lanzara un error de undefined.
    const student = {
      name: studentData.name,
      age: studentData.age,
      hobbies: studentData.hobbies || [],
      createdAt: new Date(),
    }
    // Si no creamos ningun objeto y solo metemos lo que venga por el input, la base de datos lo guardaría sin ningún problema.

    // Llamamos al repositorio para hacer el guardado en base de datos, si este no esta implementado en el dataSource el repositorio lanzara un error por falta de implementación
    return studentRepository.save(student)
  }

  return { save }
}

module.exports = {
  StudentRepository,
}

