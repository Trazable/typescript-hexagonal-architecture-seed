const expect = require('expect')
const addExample = require('./add-example')
const { exampleRepository } = require('../../dependencies')
const sinon = require('sinon')

describe('addExample use-case', () => {
  const now = new Date()
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
  })


  it('should create a new example successfully', async () => {
    const entryExampleData = {
      name: 'Example Name',
    }

    const expectedResult = {
      _id: '5fa53c7c8f4a596b2ad31e2c',
      name: 'Example Name',
      createdAt: now.toISOString(),
    }


    const stub = sinon.stub(exampleRepository, 'save').returns(expectedResult)

    const example = await addExample(exampleRepository)(entryExampleData)

    expect(example).toStrictEqual(expectedResult)
    expect(
      stub.calledOnceWith({
        name: 'Example Name',
        createdAt: now.toISOString(),
      })
    ).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
