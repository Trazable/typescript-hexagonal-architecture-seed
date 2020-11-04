/**
 * Example Repository Interface
 * Esta "interfaz" deberá seguirse por todas sus implementaciones y servir de "plantilla" para conocer todos los métodos para el acceso a datos.
 * Los dataSources deberán extender de el.
 * En caso de llamar a un método y este no estar implementado en el dataSource el repositorio se encargará de lanzar un error de método no implementado.
 */
function ExampleRepository () {}

/**
 *
 * @param {*} example
 */
ExampleRepository.prototype.save = function (example) {
  return Promise.reject(new Error('Method save not implemented'))
}

/**
 *
 * @param {*} example
 */
ExampleRepository.prototype.getAll = function (example) {
  return Promise.reject(new Error('Method getAll not implemented'))
}

module.exports = ExampleRepository
