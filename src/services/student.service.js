const { StudentEntity } = require('../entities/student.entity')

// STUDENT SERVICE
// Recogemos la dependencia inyectada desde el controlador
module.exports = (studentRepository) => {
  /**
   *
   * @param {*} student
   */
  const save = async (student) => {
    // Business logic
    student = new StudentEntity(student)
    student = { ...student, param: 'modified data' }
    // Llamamos al repositorio para hacer el guardado en base de datos, si este no esta implementado en el dataSource el repositorio lanzara un error por falta de implementación
    return studentRepository.save(student)
  }

  return { save }
}

