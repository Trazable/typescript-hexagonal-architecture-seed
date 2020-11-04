const ExampleMongoDataSource = require('../datasources/mongoDB/collections/example.data-source')

/* Dependencias del proyecto, en este fichero se pueden declarar dependencias para inyectarlas en cascada a lo largo de la aplicación.

En este ejemplo se hace uso del repositorio de example, se crea una instancia del data source de mongo de estudiante que extiende de ExampleRepository,
en caso de querer por ejemplo dos bases de datos distintas que utilicen el mismo repositorio habria que renombrar el repositorio haciendo referencia a la base de datos.
Ejemplo =>
exampleRepository: new ExampleMongoDataSource()

Ambos dataSources extenderian de ExampleRepository que es quien dicta los metodos.

De esta misma forma se puede hacer una inyección de las dependencias necesarias para usarlas mas tarde.

*/


module.exports = (() => {
  return {
    // ExampleRepository es una instancia del dataSource de example de mongo que a su vez extiende de la "interfaz" ExampleRepository
    exampleRepository: new ExampleMongoDataSource(),
  }
})()
