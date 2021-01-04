const expect = require('expect')
const ChangeName = require('.')
const ExampleRepository = require('../../repositories/example.repository')
const Example = require('../../entities/example')
const sinon = require('sinon')

describe('updateExample use-case', () => {
  beforeEach(() => {
    sinon.resetHistory()
  })

  it('should update the example successfully', async () => {
    sinon.stub(ExampleRepository.prototype, 'getById').returns(
      new Example({
        name: 'Old Name',
      })
    )
    const stubUpdate = sinon.stub(ExampleRepository.prototype, 'update').returns(Promise.resolve(89))

    const logger = {
      info: function (message) {
        // eslint-disable-next-line no-console
        console.log(message)
      },
    }

    const changeName = new ChangeName(new ExampleRepository(), logger)

    await changeName.execute('id', 'New Name')

    expect(stubUpdate.calledOnce).toBeTruthy()
    expect(stubUpdate.calledWithExactly(new Example({ name: 'New Name' }))).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
