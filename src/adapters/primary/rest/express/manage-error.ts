import { Response } from 'express'

// EXCEPTIONS
import { AlreadyExistsError } from '../../../../exceptions/already-exists'
import { NotFoundError } from '../../../../exceptions/not-found'
import { PropertyRequiredError } from '../../../../exceptions/property-required'

// HTTP CODES
import { StatusCodes } from 'http-status-codes'
import { ILogger } from '../../../../ports/logger'

export interface CustomError extends Error {
  severity?: 'info' | 'warn' | 'error'
}

export const ManageError = (error: CustomError, res: Response, logger: ILogger): void => {
  // If the instance of the error is a business exception, return a custom message

  logger[error.severity || 'error'](error.stack || error.message)

  if (error instanceof AlreadyExistsError) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message)
  } else if (error instanceof NotFoundError) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message)
  } else if (error instanceof PropertyRequiredError) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message)
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}
