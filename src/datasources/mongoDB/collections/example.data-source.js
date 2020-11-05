/**
 * In this example a "Class" is created through prototypes, bypassing the database's configuration
 * which must still working at the app's startup or wherever you need. This file mirror the Classes's extends behaviour.
 */

const ExampleRepository = require('../../../repositories/example.repository')
const initDatabase = require('..')


function ExampleMongoDataSource () {
  // Call parent class's constructor
  ExampleRepository.call(this)
}

// The logic to extends with prototypes happen on the following 2 lines.
// Create a new "class" with the parent's prototype (getting methods and attributes from the parent class)
ExampleMongoDataSource.prototype = Object.create(ExampleRepository.prototype)
// Declare in the prototype from the new "class" that its constructor is its parent for having invoked ExampleRepository.call(this) in its function.
ExampleMongoDataSource.prototype.constructor = ExampleMongoDataSource

/*
* Class methods
* To try to mirror the behavior of an interface, we will use extends javascript to implement the methods declared in the parent class,
* in case of invoking a non-implemented method of the superclass, the superclass will throw an error of non-implemented method.
*/

// The parent's save method, extending the parent will create a redirect that will throw an error if a method not implemented here is invoked.
ExampleMongoDataSource.prototype.save = async function (example) {
  const database = await initDatabase()

  const result = await database
    .collection('example')
    .insertOne(example)

  return result.ops[0]
}

// The parent's getAll method, extending the parent will create a redirect that will throw an error if a method not implemented here is invoked.
ExampleMongoDataSource.prototype.getAll = async function () {
  const database = await initDatabase()

  const result = await database
    .collection('example')
    .find()
    .toArray()

  return result
}


module.exports = ExampleMongoDataSource

