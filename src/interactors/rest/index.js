/*
 * Express configuration as REST interactor
 */

const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const Config = require('../../config')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))

// Router
app.use(routes)


// Listen for requests
app.listen(Config.INTERACTORS.REST.PORT, () => {
  console.log(`Server is listening on port ${Config.INTERACTORS.REST.PORT}`)
})


module.exports = app