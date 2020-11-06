const ExampleMongoDataSource = require('../datasources/mongoDB/collections/example.data-source')

/*
Project dependencies, this file serves for declaring dependencies and then inject them in cascade along the app.

In this example is used the example repository, is created a data source's instance which extends from ExampleRepository,
In case you want for example different databases that uses the same repository, just rename the repository making reference to the database.
Example => exampleRepository: new ExampleMongoDataSource()

Both datasources would extend from ExampleRepository which is the file that rules the methods.
By this way you can inject the needed dependencies to use them later.

*/


module.exports = (() => {
  return {
    // exampleRepository is a datasource's instance, which in turn extends from the ExampleRepository's "interface"
    exampleRepository: new ExampleMongoDataSource(),
  }
})()
