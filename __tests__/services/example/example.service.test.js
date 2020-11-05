const expect = require('expect')
const ExampleService = require('../../../src/services/example.service')

describe('Example Service tests', () => {
  let dataSource

  beforeEach(function () {
    // DATA SOURCE MOCK
    dataSource = {
      getAll: () => new Promise(resolve => resolve([{ name: 'example1' }, { name: 'example2' }])),
      save: (example) => new Promise(resolve => resolve({
        name: example.name,
        createdAt: '2020-11-04T16:55:28.725Z',
      })),
    }
  })

  it('should return all data from the database', async () => {
    const exampleService = ExampleService(dataSource)

    const response = await exampleService.getAll()

    expect(response).toStrictEqual([{ name: 'example1' }, { name: 'example2' }])
  })

  it('should save data in the database', async () => {
    const exampleService = ExampleService(dataSource)

    const response = await exampleService.save({ name: 'example' })

    expect(response).toStrictEqual({ name: 'example', createdAt: '2020-11-04T16:55:28.725Z' })
  })
})
