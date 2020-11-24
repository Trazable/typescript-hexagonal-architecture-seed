const NameAlreadyExists = require('../../../../../exceptions/name-already-exists')

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes')
const ExampleNotFound = require('../../../../../exceptions/example-not-found')

module.exports = (error, res) => {
  let response
  switch (error.constructor) {
    case NameAlreadyExists:
      response = res.status(BAD_REQUEST).json('The example name already exists')
      break
    case ExampleNotFound:
      response = res.status(BAD_REQUEST).json('Example not found')
      break
    default:
      response = res.status(INTERNAL_SERVER_ERROR).end()
  }

  return response
}
