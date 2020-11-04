
// EXAMPLE SERVICE
const ExampleRepository = require('../repositories/example.repository') // eslint-disable-line no-unused-vars

// Recogemos la dependencia inyectada desde el controlador
/**
 *
 * @param {ExampleRepository} exampleRepository
 */
module.exports = (exampleRepository) => {
  /**
   *
   * @param {*} example
   * @return {Promise<T>}
   */
  const save = async (exampleData) => {
    // Business logic

    // Creamos la estructura en run-time que sera almacenada por primera vez en el guardado de la base de datos.
    // En este ejemplo, si exampleData no tiene name, age y hobbies lanzara un error de undefined.
    const example = {
      name: exampleData.name,
      createdAt: new Date(),
    }
    // Si no creamos ningun objeto y solo metemos lo que venga por el input, la base de datos lo guardaría sin ningún problema.

    // Llamamos al repositorio para hacer el guardado en base de datos, si este no esta implementado en el dataSource el repositorio lanzara un error por falta de implementación
    return exampleRepository.save(example)
  }

  /**
   *
   * @return {Promise<T>}
   */
  const getAll = async () => {
    // Business logic
    // Si no creamos ningun objeto y solo metemos lo que venga por el input, la base de datos lo guardaría sin ningún problema.

    // Llamamos al repositorio para hacer el guardado en base de datos, si este no esta implementado en el dataSource el repositorio lanzara un error por falta de implementación
    return exampleRepository.getAll()
  }

  return { save, getAll }
}

