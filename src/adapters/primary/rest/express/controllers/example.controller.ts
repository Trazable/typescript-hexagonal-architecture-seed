import { Add } from '../../../../../use-cases/add'
import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'

import ManageError from '../manage-error'
import { GetAll } from '../../../../../use-cases/getAll'
import { ChangeName } from '../../../../../use-cases/changeName'
import { ExampleDTO } from '../DTOs/example.dto'

// This secondary adapter calls directly the useCases.
export class ExampleController {
  addUseCase: Add
  getAllUseCase: GetAll
  changeNameUseCase: ChangeName

  constructor(addUseCase: Add, getAllUseCase: GetAll, changeNameUseCase: ChangeName) {
    this.addUseCase = addUseCase
    this.getAllUseCase = getAllUseCase
    this.changeNameUseCase = changeNameUseCase
  }

  add = async (req: Request, res: Response): Promise<void> => {
    const example = req.body
    try {
      await this.addUseCase.execute(example)
      res.status(StatusCodes.CREATED).end()
    } catch (error) {
      this.addUseCase.getUseCaseLogger().error(error.stack)
      ManageError(error, res)
    }
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const examples = await this.getAllUseCase.execute()
      const examplesDTO = examples.map(example => new ExampleDTO(example))
      examplesDTO.length > 0 ? res.status(StatusCodes.OK).json(examplesDTO) : res.status(StatusCodes.NO_CONTENT).end()
    } catch (error) {
      this.getAllUseCase.getUseCaseLogger().error(error.stack)
      ManageError(error, res)
    }
  }

  changeName = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { name } = req.body
    try {
      await this.changeNameUseCase.execute(id, name)
      res.status(StatusCodes.OK).end()
    } catch (error) {
      this.changeNameUseCase.getUseCaseLogger().error(error.stack)
      ManageError(error, res)
    }
  }
}
