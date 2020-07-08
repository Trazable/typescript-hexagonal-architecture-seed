/*
 * The Controller function is prepare the rest data to be used by the use cases
 * and prepare the response for the rest interactor
 */


const { addTodo } = require('../../../use-cases/add-todo')
const { getTodos } = require('../../../use-cases/get-todos')
const MongoDataSource = require('../../../datasources/mongo.datasource')

/**
 * Handler Post a new Todo
 * @method POST
 * @namespace TODO
 * 
 * @param {[ body: any, query: any, params: any ]} httpRequest
 * @return {Promise<{ statusCode: number, body?: any }>} Response
 */
exports.postTodo = async (httpRequest) => {
  try {
    const todo = await addTodo(MongoDataSource, httpRequest.body)

    return {
      statusCode: 201,
      body: todo
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }
}

/**
 * Handler GET all Todo
 * @method GET
 * @namespace TODO
 * 
 * @param {[ body: any, query: any, params: any ]} httpRequest
 * @return {Promise<{ statusCode: number, body?: any }>} Response
 */
exports.getTodos = async (httpRequest) => {
  try {
    const todos = await getTodos(MongoDataSource)

    return {
      statusCode: 200,
      body: todos
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }
}