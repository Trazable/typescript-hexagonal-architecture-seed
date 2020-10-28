const StudentMongoDataSource = require('../datasources/mongoDB/collections/student.data-source')

/* Dependencias del proyecto, en este fichero se pueden declarar dependencias para inyectarlas en cascada a lo largo de la aplicación.

En este ejemplo se hace uso del repositorio de student, se crea una instancia del data source de mongo de estudiante que extiende de StudentRepository,
en caso de querer por ejemplo dos bases de datos distintas que utilicen el mismo repositorio habria que renombrar el repositorio haciendo referencia a la base de datos.
Ejemplo =>
studentMongoRepository: new StudentMongoDataSource()
studentMysqlRepository: new StudentMysqlDataSource()

Ambos dataSources extenderian de StudentRepository que es quien dicta los metodos.

De esta misma forma se puede hacer una inyección de las dependencias necesarias para usarlas mas tarde.

*/


module.exports = (() => {
  return {
    // StudentRepository es una instancia del dataSource de student de mongo que a su vez extiende de la "interfaz" StudentRepository
    studentRepository: new StudentMongoDataSource(),
  }
})()
