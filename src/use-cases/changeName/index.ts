import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ExampleNotFound } from '../../exceptions/example-not-found'
import { ILogger } from '../../ports/logger'

export class ChangeName {
  repository: IExampleRepository
  logger: ILogger

  constructor(repository: IExampleRepository, logger: ILogger) {
    this.repository = repository
    this.logger = logger
  }

  async execute(id: string, name: string): Promise<Example> {
    this.logger.info(`Changing the name of the example ${name}`)
    // REPOSITORY
    // Retrieve the entity with all data
    const example = await this.repository.getByName(name)

    // BUSINESS EXCEPTIONS
    if (!example) throw new ExampleNotFound()
    // ENTITY LOGIC
    // Change only the necessary field in the useCase
    example.changeName(name)
    // REPOSITORY
    // Update the entity
    await this.repository.update(example)

    this.logger.info(`Changed the name from the example ${name}`)
    return example
  }

  getUseCaseLogger(): ILogger {
    return this.logger
  }
}
