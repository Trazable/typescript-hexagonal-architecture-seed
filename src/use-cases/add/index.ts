import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ObjectId } from 'mongodb' // ONLY EXAMPLE USE
import { NameAlreadyExists } from '../../exceptions/example-name-already-exists'
import { ExampleNameRequired } from '../../exceptions/example-name-is-required'
import { ILogger } from '../../ports/logger'

export class Add {
  repository: IExampleRepository
  logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
  }

  async execute(example: Example): Promise<Example> {
    this.logger.info('Creating a new example')
    // REPOSITORY
    const nameAlreadyExist = await this.repository.getByName(example.name)
    // BUSINESS EXCEPTIONS
    if (!example.name) throw new ExampleNameRequired()
    if (nameAlreadyExist) throw new NameAlreadyExists()
    // REPOSITORY
    const newExample = new Example({ ...example, id: new ObjectId().toHexString(), createdAt: new Date() })

    await this.repository.save(newExample)

    this.logger.info('New example created succesfully')

    return newExample
  }

  getUseCaseLogger(): ILogger {
    return this.logger
  }
}
