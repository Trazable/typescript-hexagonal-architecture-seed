const expect = require('expect')
const ExampleService = require('../../../src/services/example.service')

describe('when get all data', () => {
  it ('should return all data from the database', () => {

    const dataSource = {
      getAll: function() { return { name: 'name' }},
    }

    const exampleService = new ExampleService(dataSource)

    const response = exampleService.getAll()

    expect(response).toStrictEqual({ name: 'name' })
  })
})