// APPLICATION INDEX

;(async () => {
  /// //// SECONDARY ADAPTERS (OUTPUT) \\\\ \\\

  // Google dependencies
  const GoogleWinstonLogger = require('./adapters/secondary/google/third-party-services/logger')
  const googleContainerLogger = new GoogleWinstonLogger()

  const GoogleCloudSecret = require('../src/adapters/secondary/google/managers/secret')
  const googleCloudSecretManager = new GoogleCloudSecret()

  // Mongo database configuration
  const MongoManager = require('./adapters/secondary/mongo')
  const mongoManager = new MongoManager(googleContainerLogger.getDatabaseContainer(), googleCloudSecretManager)
  // Connect database and retrieve the client
  const mongoClient = await mongoManager.connect()

  // Mongo repository injection
  const MongoExampleRepository = require('./adapters/secondary/mongo/example.repository')
  // Repositories
  const addUseCasExampleRepository = new MongoExampleRepository(
    mongoClient,
    googleContainerLogger.getAddUseCaseContainer()
  )
  const getAllUseCaseExampleRepository = new MongoExampleRepository(
    mongoClient,
    googleContainerLogger.getGetAllUseCaseContainer()
  )
  const changeNameUseCaseExampleRepository = new MongoExampleRepository(
    mongoClient,
    googleContainerLogger.getChangeNameUseCaseContainer()
  )

  /// //// PRIMARY PORTS (CORE) \\\\ \\\

  // Use Cases \\

  // ADD
  const AddUseCase = require('./use-cases/add')
  const addUseCase = new AddUseCase(addUseCasExampleRepository, googleContainerLogger.getAddUseCaseContainer())

  // GET ALL
  const GetAllUseCase = require('./use-cases/getAll')
  const getAllUseCase = new GetAllUseCase(
    getAllUseCaseExampleRepository,
    googleContainerLogger.getGetAllUseCaseContainer()
  )

  // CHANGE NAME
  const ChangeNameUseCase = require('./use-cases/changeName')
  const changeNameUseCase = new ChangeNameUseCase(
    changeNameUseCaseExampleRepository,
    googleContainerLogger.getChangeNameUseCaseContainer()
  )

  /// //// PRIMARY ADAPTERS (INPUT) \\\\ \\\

  // Express configuration
  const ExpressApi = require('./adapters/primary/rest/express')
  // Dependency injection
  const api = new ExpressApi(
    { addUseCase, getAllUseCase, changeNameUseCase },
    googleContainerLogger.getDefaultContainer()
  )

  // Start api at port 8080
  api.start(process.env.PORT || 8080)
})()
