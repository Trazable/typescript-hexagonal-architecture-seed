const { loggerController: logger } = require('../../../../utils/logger')
const { StatusCodes } = require('http-status-codes')
const addExample = require('../../../../use-cases/add-example/add-example')
const getAllExamples = require('../../../../use-cases/get-all-examples/get-all-examples')
const updateExample = require('../../../../use-cases/update-example/update-example')

// Dependency injection
module.exports = (dependencies) => {
  // Extract needed dependencies to use in the service
  const { exampleRepository } = dependencies

  const save = async (req, res) => {
    try {
      // Inject the comming repository into the service
      // In case you want more repositories just add them as params
      const example = await addExample(exampleRepository)(req.body)

      return res.status(StatusCodes.OK).json(example)
    } catch (error) {
      logger.error(error)
      return res.status(StatusCodes.BAD_REQUEST).json(error)
    }
  }

  const getAll = async (req, res) => {
    try {
      const examples = await getAllExamples(exampleRepository)()

      return res.status(StatusCodes.OK).json(examples)
    } catch (error) {
      logger.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  const update = async (req, res) => {
    try {
      const example = await updateExample(exampleRepository)(
        req.params.id,
        req.body
      )

      return res.status(StatusCodes.OK).json(example)
    } catch (error) {
      logger.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  return { save, getAll, update }
}
