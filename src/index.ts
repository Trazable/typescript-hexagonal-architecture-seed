// APPLICATION INDEX

import { Add } from './use-cases/add'
import { ExpressApi } from './adapters/primary/rest/express'
import { MongoManager } from './adapters/secondary/mongo'
import { MongoExampleRepository } from './adapters/secondary/mongo/example.repository'
import { install as installSourceMapSupport } from 'source-map-support'
import { GetAll } from './use-cases/getAll'
import { ChangeName } from './use-cases/changeName'
import { ShowMessage } from './use-cases/showMessage'
import { GoogleWinstonLogger } from './adapters/secondary/google/logger'
import { GoogleCloudSecret } from './adapters/secondary/google/secret'
import { GoogleKMS } from './adapters/secondary/google/kms'
import { GoogleStorage } from './adapters/secondary/google/storage'
import { GoogleQueue } from './adapters/secondary/google/queue'
import { NanoIdGenerator } from './adapters/secondary/nanoid-generator'
import { AxiosHttp } from './adapters/secondary/http/axios-http'
import { TrazableAuth } from './adapters/secondary/trazable/trazable-auth'
import {
  DATABASE_LOGGER,
  ADD_USE_CASE_LOGGER,
  GET_ALL_USE_CASE_LOGGER,
  CHANGE_NAME_USE_CASE_LOGGER,
  EXPRESS_API_LOGGER,
  SHOW_MESSAGE_USE_CASE_LOGGER,
  PUBSUB_LOGGER,
} from './constants'
import { GooglePubSub } from './adapters/primary/queue/pubsub'
;(async () => {
  // Source mapping => compiled js
  installSourceMapSupport()

  /// //// SECONDARY ADAPTERS (OUTPUT) \\\\ \\\

  // Mongo database configuration
  const mongoManager = new MongoManager(
    new GoogleCloudSecret(new GoogleKMS(), new GoogleStorage()),
    new GoogleWinstonLogger(DATABASE_LOGGER)
  )
  // Connect database and retrieve the client
  const mongoClient = await mongoManager.connect()

  // USE-CASE LOGGERS
  const addUseCaseLogger = new GoogleWinstonLogger(ADD_USE_CASE_LOGGER)
  const getAllUseCaseLogger = new GoogleWinstonLogger(GET_ALL_USE_CASE_LOGGER)
  const changeNameUseCaseLogger = new GoogleWinstonLogger(CHANGE_NAME_USE_CASE_LOGGER)
  const logCreationUseCaseLogger = new GoogleWinstonLogger(SHOW_MESSAGE_USE_CASE_LOGGER)

  if (mongoClient) {
    // Repositories
    const exampleAddRepository = new MongoExampleRepository(mongoClient, addUseCaseLogger)
    const exampleGetAllRepository = new MongoExampleRepository(mongoClient, getAllUseCaseLogger)
    const exampleChangeNameRepository = new MongoExampleRepository(mongoClient, changeNameUseCaseLogger)

    /// //// PRIMARY PORTS (CORE) \\\\ \\\

    // ADD
    const addUseCase = new Add(
      exampleAddRepository,
      addUseCaseLogger,
      new NanoIdGenerator(),
      new GoogleQueue(process.env.GCLOUD_PROJECT_ID || '')
    )

    // GET ALL
    const getAllUseCase = new GetAll(exampleGetAllRepository, getAllUseCaseLogger)

    // CHANGE NAME
    const changeNameUseCase = new ChangeName(exampleChangeNameRepository, changeNameUseCaseLogger)

    // LOG CREATION
    const logCreationUseCase = new ShowMessage(logCreationUseCaseLogger)

    /// //// PRIMARY ADAPTERS (INPUT) \\\\ \\\
    const api = new ExpressApi(
      addUseCase,
      getAllUseCase,
      changeNameUseCase,
      new GoogleWinstonLogger(EXPRESS_API_LOGGER),
      new TrazableAuth(new AxiosHttp(), process.env.AUTH_URL)
    )
    // Start api at port 8080
    api.start(process.env.PORT || '8080')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pubSub = new GooglePubSub(
      process.env.GCLOUD_PROJECT_ID || '',
      logCreationUseCase,
      new GoogleWinstonLogger(PUBSUB_LOGGER)
    )
  }
})()
