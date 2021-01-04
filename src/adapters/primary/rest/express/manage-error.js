// EXCEPTIONS
const ExampleNameAlreadyExists = require('../../../../exceptions/example-name-already-exists')
const ExampleNotFound = require('../../../../exceptions/example-not-found')
const ExampleNameRequired = require('../../../../exceptions/example-name-is-required')

// HTTP CODES
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes')


module.exports = (error, res) => {
  let response

  // error.constructor is the same that instanceof Error
  // If the instance of the error is a business exception, return a custom message
  switch (error.constructor) {
    case ExampleNameAlreadyExists:
      response = res.status(BAD_REQUEST).json('The example name already exists')
      break
    case ExampleNotFound:
      response = res.status(BAD_REQUEST).json('Example not found')
      break
    case ExampleNameRequired:
      response = res.status(BAD_REQUEST).json('Example name is required')
      break
    default:
      response = res.status(INTERNAL_SERVER_ERROR).end()
  }

  return response
}
