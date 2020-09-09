/**
 * En este ejemplo se utiliza la creación de una "clase" de javascript mediante prototypes, obviando la configuración de base de datos
 * que se debería hacer en el inicio de la aplicación o donde se desee este fichero copia el comportamiento del extends clasico de las clases.
 */


/* eslint-disable no-console */
const StudentRepository = require('../../../repositories/student.repository')
const { MongoClient } = require('mongodb')

// DATABASE CONFIGURATION
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function _makeDataBase () {
  try {
    if (!mongoClient.isConnected()) {
      await mongoClient.connect()
      console.debug('Database connected')
    }

    return mongoClient.db('hexagonal')
  } catch (error) {
    console.error('Database error', error.message)
  }
}


// Creamos el nombre de la función
function StudentMongoDataSource () {
  // Llama al constructor de la clase padre
  StudentRepository.call(this)
}
// La lógica para realizar un extends con prototype ocurre en estas dos lineas.
// Creamos la nueva "clase" con el prototype del padre (Obteniendo los métodos y atributos de la clase padre)
StudentMongoDataSource.prototype = Object.create(StudentRepository.prototype)
// Declaramos en el prototype de la nueva "clase" que su constructor es su padre al haber invocado en su función a StudentRepository.call(this)
StudentMongoDataSource.prototype.constructor = StudentMongoDataSource

/* Metodos de la clase
* Para intentar imitar el comportamiento de una interfaz haremos uso en javascript de extends para implementar los métodos declarados en la clase padre,
* en caso de invocar a un método no implementado de la superclase, la superclase lanzara un error de método no implementado.
*/

// Método save del padre, al extender del padre este creara un redireccionamiento que lanzara un error si se invoca a un método no implementado aqui.
StudentMongoDataSource.prototype.save = async function (student) {
  const database = await _makeDataBase()

  const result = await database
    .collection('example')
    .insertOne(student)

  return result.ops[0]
}


module.exports = StudentMongoDataSource

