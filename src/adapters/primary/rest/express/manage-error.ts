import { Response } from 'express'

// EXCEPTIONS
import { NameAlreadyExists } from '../../../../exceptions/example-name-already-exists'
import { ExampleNotFound } from '../../../../exceptions/example-not-found'
import { ExampleNameRequired } from '../../../../exceptions/example-name-is-required'

// HTTP CODES
import { StatusCodes } from 'http-status-codes'

export default (error: Error, res: Response): void => {
  // error.constructor is the same that instanceof Error
  // If the instance of the error is a business exception, return a custom message
  switch (error.constructor) {
    case NameAlreadyExists:
      res.status(StatusCodes.BAD_REQUEST).json('The example name already exists')
      break
    case ExampleNotFound:
      res.status(StatusCodes.BAD_REQUEST).json('Example not found')
      break
    case ExampleNameRequired:
      res.status(StatusCodes.BAD_REQUEST).json('Example name is required')
      break
    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}
