// APPLICATION INDEX

/// //// SECONDARY ADAPTERS (OUTPUT) \\\\ \\\

// Mongo database configuration
const MongoManager = require('./adapters/mongo')
const mongoClient = new MongoManager(process.env.DB_URI, process.env.DB_USER, process.env.DB_PASSWORD).getClient()

// Mongo datasource injectionclear
const MongoExampleDataSource = require('./adapters/mongo/example.datasource')
// Repositories
const exampleRepository = new MongoExampleDataSource(mongoClient)

/// //// PRIMARY PORTS (CORE) \\\\ \\\

// Managers
const ExampleManager = require('./interactors/example')
// Dependencies injection
const exampleManager = new ExampleManager(exampleRepository)

/// //// PRIMARY ADAPTERS (INPUT) \\\\ \\\

// Express configuration
const ExpressApi = require('./adapters/express')
// Dependency injection
const api = new ExpressApi(exampleManager)

api.start(8080)

