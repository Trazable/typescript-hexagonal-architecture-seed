const expect = require('expect')
const updateExample = require('./update-example')
const { exampleRepository } = require('../../dependencies')
const sinon = require('sinon')


describe('updateExample use-case', () => {
  beforeEach(() => {
    sinon.resetHistory()
  })

  it('should update the example successfully', async () => {
    const entryExampleData = {
      name: 'Example Name',
    }

    const stubUpdate = sinon.stub(exampleRepository, 'update')
    stubUpdate.returns(Promise.resolve(89))

    await updateExample(exampleRepository)('id', entryExampleData)

    expect(stubUpdate.calledOnce).toBeTruthy()
    expect(stubUpdate.calledWithExactly('id', entryExampleData)).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
