/**
 * En este ejemplo se utiliza la creación de una "clase" de javascript mediante prototypes, obviando la configuración de base de datos
 * que se debería hacer en el inicio de la aplicación o donde se desee este fichero copia el comportamiento del extends clasico de las clases.
 */

const ExampleRepository = require('../../../repositories/example.repository')
const initDatabase = require('..')


// Creamos el nombre de la función
function ExampleMongoDataSource () {
  // Llama al constructor de la clase padre
  ExampleRepository.call(this)
}
// La lógica para realizar un extends con prototype ocurre en estas dos lineas.
// Creamos la nueva "clase" con el prototype del padre (Obteniendo los métodos y atributos de la clase padre)
ExampleMongoDataSource.prototype = Object.create(ExampleRepository.prototype)
// Declaramos en el prototype de la nueva "clase" que su constructor es su padre al haber invocado en su función a ExampleRepository.call(this)
ExampleMongoDataSource.prototype.constructor = ExampleMongoDataSource

/* Metodos de la clase
* Para intentar imitar el comportamiento de una interfaz haremos uso en javascript de extends para implementar los métodos declarados en la clase padre,
* en caso de invocar a un método no implementado de la superclase, la superclase lanzara un error de método no implementado.
*/

// Método save del padre, al extender del padre este creara un redireccionamiento que lanzara un error si se invoca a un método no implementado aqui.
ExampleMongoDataSource.prototype.save = async function (example) {
  const database = await initDatabase()

  const result = await database
    .collection('example')
    .insertOne(example)

  return result.ops[0]
}


module.exports = ExampleMongoDataSource

