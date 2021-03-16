import { Response } from 'express'

// EXCEPTIONS
import { AlreadyExistsError } from '../../../../exceptions/already-exists'
import { NotFoundError } from '../../../../exceptions/not-found'
import { PropertyRequiredError } from '../../../../exceptions/property-required'

// HTTP CODES
import { StatusCodes } from 'http-status-codes'

export const ManageError = (error: Error, res: Response): void => {
  // If the instance of the error is a business exception, return a custom message

  if (error instanceof AlreadyExistsError) {
    res.status(StatusCodes.BAD_REQUEST).json('Already exists')
  } else if (error instanceof NotFoundError) {
    res.status(StatusCodes.BAD_REQUEST).json('Not found')
  } else if (error instanceof PropertyRequiredError) {
    res.status(StatusCodes.BAD_REQUEST).json(`Property ${error.propertyName} is required`)
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}
