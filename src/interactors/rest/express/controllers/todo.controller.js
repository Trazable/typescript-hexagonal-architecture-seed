/*
 * The Controller function is prepare the rest data to be used by the use cases
 * and prepare the response for the rest interactor
 */

const ExampleService = require('../../../../services/example.service')
const MongoDataSource = require('../../../../datasources/mongoDB/collections/todo.data-source')

/**
 * Handler Post a new Todo
 * @method POST
 * @namespace TODO
 * 
 * @param {Request} req
 * @param {Response} res
 */
exports.save = async (req, res) => {
  try {
    const exampleService = new ExampleService(MongoDataSource)

    await exampleService.save(req.body)

    return res.status(201).end()
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message
    })
  }
}

/**
 * Handler GET all Todo
 * @method GET
 * @namespace TODO
 * 
 * @param {Request} req
 * @param {Response} res
 */
exports.getAll = async (req, res) => {
  try {
    const exampleService = new ExampleService(MongoDataSource)

    const todos = await exampleService.getAll()

    return res.status(200).json(todos)
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message
    })
  }
}