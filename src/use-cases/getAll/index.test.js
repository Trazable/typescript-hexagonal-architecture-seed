const expect = require('expect')
const GetAllUseCase = require('.')
const ExampleRepository = require('../../ports/secondary/example.repository')
const sinon = require('sinon')


describe('getAllExamples use-case', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should get all examples successfully', async () => {
    const expectedResult = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]

    const stub = sinon.stub(ExampleRepository.prototype, 'getAll').returns(expectedResult)

    const logger = {
      info: function () {},
    }

    const getAllUseCase = new GetAllUseCase(new ExampleRepository(), logger)

    const examples = await getAllUseCase.execute()

    expect(examples).toStrictEqual(expectedResult)
    expect(stub.calledOnceWith()).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
