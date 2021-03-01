import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'

import { ExampleController } from './controllers/example.controller'
import { Add } from '../../../../use-cases/add'
import { GetAll } from '../../../../use-cases/getAll'
import { ChangeName } from '../../../../use-cases/changeName'
import { ILogger } from '../../../../ports/logger'
const app = express()

/*
 * Express configuration
 */

export class ExpressApi {
  addUseCase: Add
  getAllUseCase: GetAll
  changeNameUseCase: ChangeName
  logger: ILogger

  constructor(addUseCase: Add, getAllUseCase: GetAll, changeNameUseCase: ChangeName, logger: ILogger) {
    this.addUseCase = addUseCase
    this.getAllUseCase = getAllUseCase
    this.changeNameUseCase = changeNameUseCase

    this.logger = logger

    this.serverConfiguration()
    this.setupRoutes()
  }

  start(port: string): void {
    app.listen(port, () => {
      this.logger.info(`App listening on port ${port} `)
    })
  }

  private serverConfiguration(): void {
    app.use(bodyParser.json())
    app.use(helmet())
    app.use(morgan('combined'))
  }

  private setupRoutes() {
    const router = express.Router()

    // Ping route
    router.route('/ping').get((req, res) => {
      res.status(StatusCodes.OK).end()
    })

    const exampleController = new ExampleController(this.addUseCase, this.getAllUseCase, this.changeNameUseCase)

    router.route('/examples/').post(exampleController.add)

    router.route('/examples/').post(exampleController.add).get(exampleController.getAll)

    router.route('/examples/changeName/:id').patch(exampleController.changeName)

    app.use(router)
  }
}
