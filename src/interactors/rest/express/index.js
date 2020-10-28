/*
 * Express configuration as REST interactor
 */

const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const dependencies = require('../../../dependencies')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))

// Router
// Inyección de dependencias en cascada desde el inicio de la aplicación, en este caso un servidor de express
app.use('/', routes(dependencies))


// Listen for requests
const port = 8080
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
})


module.exports = app
