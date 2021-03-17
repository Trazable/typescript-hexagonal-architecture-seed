import express, { Express } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'

import { ExampleController } from './controllers/example.controller'
import { Add } from '../../../../use-cases/add'
import { GetAll } from '../../../../use-cases/getAll'
import { ChangeName } from '../../../../use-cases/changeName'
import { ILogger } from '../../../../ports/logger'
import { AuthenticationMiddleware } from './middlewares/authentication'
import { IAuth } from '../../../../ports/auth'

/*
 * Express configuration
 */
export class ExpressApi {
  private readonly addUseCase: Add
  private readonly getAllUseCase: GetAll
  private readonly changeNameUseCase: ChangeName
  private readonly logger: ILogger
  private readonly app: Express
  private readonly auth: IAuth
  private readonly authMiddleware: AuthenticationMiddleware

  constructor(addUseCase: Add, getAllUseCase: GetAll, changeNameUseCase: ChangeName, logger: ILogger, auth: IAuth) {
    this.addUseCase = addUseCase
    this.getAllUseCase = getAllUseCase
    this.changeNameUseCase = changeNameUseCase
    this.auth = auth

    this.logger = logger

    this.app = express()
    this.authMiddleware = new AuthenticationMiddleware(this.auth)
    this.serverConfiguration()
    this.setupRoutes()
  }

  /**
   * Start the express server api
   *
   * @param port - Public port on serve the api
   */
  start(port: string): void {
    this.app.listen(port, () => {
      this.logger.info(`App listening on port ${port} `)
    })
  }

  /**
   * Setup server configuration middlewares
   */
  private serverConfiguration(): void {
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(
      morgan('combined', {
        stream: {
          write: text => {
            this.logger.info(text)
          },
        },
      })
    )
  }

  /**
   * Setup server routes
   */
  private setupRoutes() {
    const router = express.Router()

    // Ping route
    router.route('/ping').get((req, res) => {
      res.status(StatusCodes.OK).end()
    })

    const exampleController = new ExampleController(this.addUseCase, this.getAllUseCase, this.changeNameUseCase)

    router
      .route('/examples/')
      .post(this.authMiddleware.authenticate, exampleController.add)
      .get(exampleController.getAll)

    router.route('/examples/changeName/:id').patch(this.authMiddleware.authenticate, exampleController.changeName)

    this.app.use(router)
  }
}
