// APPLICATION INDEX

/// //// SECONDARY ADAPTERS (OUTPUT) \\\\ \\\

// Google dependencies
const GoogleWinstonLogger = require('./adapters/secondary/google/third-party-services/logger')
const googleContainerLogger = new GoogleWinstonLogger()

// Mongo database configuration
const MongoManager = require('./adapters/secondary/mongo')
const mongoClient = new MongoManager(process.env.DB_URI, process.env.DB_USER, process.env.DB_PASSWORD).getClient()

// Mongo repository injection
const MongoExampleRepository = require('./adapters/secondary/mongo/example.repository')
// Repositories
const exampleRepository = new MongoExampleDataSource(mongoClient, googleContainerLogger.getDataSourceContainer())

/// //// PRIMARY PORTS (CORE) \\\\ \\\

// Managers
const ExampleManager = require('./interactors/example')
// Dependencies injection
const exampleManager = new ExampleManager(exampleRepository, {
  addUseCaseLogger: googleContainerLogger.getAddUseCaseContainer(),
  getAllUseCaseLogger: googleContainerLogger.getGetAllUseCaseContainer(),
  changeNameUseCaseLogger: googleContainerLogger.getChangeNameUseCaseContainer(),
})

/// //// PRIMARY ADAPTERS (INPUT) \\\\ \\\

// Express configuration
const ExpressApi = require('./adapters/primary/rest/express')
// Dependency injection
const api = new ExpressApi(exampleManager, {
  addUseCaseLogger: googleContainerLogger.getAddUseCaseContainer(),
  getAllUseCaseLogger: googleContainerLogger.getGetAllUseCaseContainer(),
  changeNameUseCaseLogger: googleContainerLogger.getChangeNameUseCaseContainer(),
  defaultLogger: googleContainerLogger.getDefaultContainer(),
})

api.start(8080)

