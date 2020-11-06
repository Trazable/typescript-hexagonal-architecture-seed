const expect = require('expect')
const getAllExamples = require('./get-all-examples')
const { exampleRepository } = require('../../dependencies')
const sinon = require('sinon')


describe('getAllExamples use-case', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should get all examples successfully', async () => {
    const expectedResult = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]
    const stub = sinon.stub(exampleRepository, 'getAll').returns(expectedResult)


    const examples = await getAllExamples(exampleRepository)()

    expect(examples).toStrictEqual(expectedResult)
    expect(stub.calledOnceWith()).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
