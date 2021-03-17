// APPLICATION INDEX

import { Add } from './use-cases/add'
import { ExpressApi } from './adapters/primary/rest/express'
import { MongoManager } from './adapters/secondary/mongo'
import { MongoExampleRepository } from './adapters/secondary/mongo/example.repository'
import { install as installSourceMapSupport } from 'source-map-support'
import { GetAll } from './use-cases/getAll'
import { ChangeName } from './use-cases/changeName'
import { GoogleWinstonLogger } from './adapters/secondary/google/third-party-services/logger'
import { GoogleCloudSecret } from './adapters/secondary/google/managers/secret'
import { NanoIdGenerator } from './adapters/secondary/nanoid-generator'
import { AxiosHttp } from './adapters/secondary/http/axios-http'
import { TrazableAuth } from './adapters/secondary/trazable/trazable-auth'

// LOGGER CONSTANTS
const DATABASE_LOGGER = 'database'
const ADD_USE_CASE_LOGGER = 'addUseCase'
const GET_ALL_USE_CASE_LOGGER = 'getAllUseCase'
const CHANGE_NAME_USE_CASE_LOGGER = 'changeNameUseCase'
const EXPRESS_API_LOGGER = 'express'

;(async () => {
  // Source mapping => compiled js
  installSourceMapSupport()

  /// //// SECONDARY ADAPTERS (OUTPUT) \\\\ \\\

  // Mongo database configuration
  const mongoManager = new MongoManager(new GoogleCloudSecret(), new GoogleWinstonLogger(DATABASE_LOGGER))
  // Connect database and retrieve the client
  const mongoClient = await mongoManager.connect()

  // USE-CASE LOGGERS
  const addUseCaseLogger = new GoogleWinstonLogger(ADD_USE_CASE_LOGGER)
  const getAllUseCaseLogger = new GoogleWinstonLogger(GET_ALL_USE_CASE_LOGGER)
  const changeNameUseCaseLogger = new GoogleWinstonLogger(CHANGE_NAME_USE_CASE_LOGGER)

  if (mongoClient) {
    // Repositories
    const exampleAddRepository = new MongoExampleRepository(mongoClient, addUseCaseLogger)
    const exampleGetAllRepository = new MongoExampleRepository(mongoClient, getAllUseCaseLogger)
    const exampleChangeNameRepository = new MongoExampleRepository(mongoClient, changeNameUseCaseLogger)

    /// //// PRIMARY PORTS (CORE) \\\\ \\\

    // ADD
    const addUseCase = new Add(exampleAddRepository, addUseCaseLogger, new NanoIdGenerator())

    // GET ALL
    const getAllUseCase = new GetAll(exampleGetAllRepository, getAllUseCaseLogger)

    // CHANGE NAME
    const changeNameUseCase = new ChangeName(exampleChangeNameRepository, changeNameUseCaseLogger)

    /// //// PRIMARY ADAPTERS (INPUT) \\\\ \\\
    const api = new ExpressApi(
      addUseCase,
      getAllUseCase,
      changeNameUseCase,
      new GoogleWinstonLogger(EXPRESS_API_LOGGER),
      new TrazableAuth(new AxiosHttp(), process.env.AUTH_URL) // TODO: add aurl as env variable
    )

    // Start api at port 8080
    api.start(process.env.PORT || '8080')
  }
})()
