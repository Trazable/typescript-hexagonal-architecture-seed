const expect = require('expect')
const AddUseCase = require('.')
const sinon = require('sinon')
const Example = require('../../entities/example')
const { ObjectId } = require('mongodb')
const ExampleRepository = require('../../repositories/example.repository')

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

    sinon.stub(ObjectId.prototype, 'toHexString').returns('123')

    const stubSave = sinon.stub(ExampleRepository.prototype, 'save').returns(expectedResult)
    sinon.stub(ExampleRepository.prototype, 'getByName').returns()

    const logger = {
      info: function () {},
    }

    const addUseCase = new AddUseCase(new ExampleRepository(), logger)

    const example = await addUseCase.execute(entryExampleData)

    expect(example).toStrictEqual(expectedResult)
    expect(
      stubSave.calledOnceWith(new Example({
        id: '123',
        name: 'Example Name',
        createdAt: now,
      }))
    ).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
