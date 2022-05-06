import { Add } from '../../../../../use-cases/add'
import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'

import { CustomError, ManageError } from '../manage-error'
import { GetAll } from '../../../../../use-cases/getAll'
import { ChangeName } from '../../../../../use-cases/changeName'
import { ExampleDTO } from '../../../DTOs/example.dto'
import { Container } from 'typedi'

// This secondary adapter calls directly the useCases.
export class ExampleController {
  private readonly addUseCase = Container.get(Add)
  private readonly getAllUseCase = Container.get(GetAll)
  private readonly changeNameUseCase = Container.get(ChangeName)

  add = async (req: Request, res: Response): Promise<void> => {
    const example = req.body
    try {
      this.addUseCase.logger.setCorrelationId(req.headers?.['correlation-id'])
      await this.addUseCase.execute(example)
      res.status(StatusCodes.CREATED).end()
    } catch (error) {
      ManageError(error as CustomError, res, this.addUseCase.logger)
    }
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const examples = await this.getAllUseCase.execute()
      const examplesDTO = examples.map(example => new ExampleDTO(example))
      examplesDTO.length > 0 ? res.status(StatusCodes.OK).json(examplesDTO) : res.status(StatusCodes.NO_CONTENT).end()
    } catch (error) {
      ManageError(error as CustomError, res, this.getAllUseCase.logger)
    }
  }

  changeName = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { name } = req.body
    try {
      await this.changeNameUseCase.execute(id, name)
      res.status(StatusCodes.OK).end()
    } catch (error) {
      ManageError(error as CustomError, res, this.changeNameUseCase.logger)
    }
  }
}
