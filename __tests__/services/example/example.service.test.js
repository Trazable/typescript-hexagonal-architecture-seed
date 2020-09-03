const expect = require('expect')
const ExampleService = require('../../../src/services/example.service')

let dataSource
before(function () {
  // DATA SOURCE MOCK
  dataSource = {
    getAll: function () { return { name: 'name' } },
    save: function () { return { name: 'name' } },
  }
})

describe('Example Service tests', () => {
  describe('when get all data', () => {
    it('should return all data from the database', () => {
      const exampleService = new ExampleService(dataSource)

      const response = exampleService.getAll()

      expect(response).toStrictEqual({ name: 'name' })
    })
  })
  describe('when save data', () => {
    it('should return the data saved in the database', () => {
      const exampleService = new ExampleService(dataSource)

      const response = exampleService.save({ name: 'name' })

      expect(response).toStrictEqual({ name: 'name' })
    })
  })
})
