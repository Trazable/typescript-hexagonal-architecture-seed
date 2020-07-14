/*
 * Express configuration as REST interactor
 */

const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))

// Router
app.use(routes)


// Listen for requests
const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})


module.exports = app