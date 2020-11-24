const expect = require('expect')
const UpdateUseCase = require('.')
const ExampleRepository = require('../../../repositories/example.repository')
const Example = require('../../../entities/example')
const sinon = require('sinon')


describe('updateExample use-case', () => {
  beforeEach(() => {
    sinon.resetHistory()
  })

  it('should update the example successfully', async () => {
    const entryExampleData = new Example({
      name: 'Example Name',
    })

    sinon.stub(ExampleRepository.prototype, 'getById').returns(new Example({
      name: 'Example Name',
    }
    ))
    const stubUpdate = sinon.stub(ExampleRepository.prototype, 'update').returns(Promise.resolve(89))

    const logger = {
      info: function () {},
    }

    const updateUseCase = new UpdateUseCase(new ExampleRepository(), logger)

    await updateUseCase.execute('id', entryExampleData)

    expect(stubUpdate.calledOnce).toBeTruthy()
    expect(stubUpdate.calledWithExactly(entryExampleData)).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
