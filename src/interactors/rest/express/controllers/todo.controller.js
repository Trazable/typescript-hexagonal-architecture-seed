/*
 * The Controller function is prepare the rest data to be used by the use cases
 * and prepare the response for the rest interactor
 */


const { addTodo } = require('../../../../services/add-todo')
const { getTodos } = require('../../../../services/get-todos')
const MongoDataSource = require('../../../../datasources/mongoDB/collections/todo.data-source')

/**
 * Handler Post a new Todo
 * @method POST
 * @namespace TODO
 * 
 * @param {Request} req
 * @param {Response} res
 */
exports.postTodo = async (req, res) => {
  try {
    const todo = await addTodo(MongoDataSource, req.body)

    return res.status(201).json(todo)
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
exports.getTodos = async (req, res) => {
  try {
    const todos = await getTodos(MongoDataSource)

    return res.status(200).json(todos)
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message
    })
  }
}