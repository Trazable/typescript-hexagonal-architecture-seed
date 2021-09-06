/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import expect from 'expect'
import { ChangeName } from '.'
import { Example } from '../../entities/example'
import sinon, { SinonFakeTimers } from 'sinon'
import ExampleDataInJSON from '../../../__mocks__/example/changeName/example-data-in.json'
import ExampleDataOutJSON from '../../../__mocks__/example/changeName/example-data-out.json'
import { FakeLogger } from '../../../__mocks__/ports/logger'
import { FakeExampleRepository } from '../../../__mocks__/repositories/example.repository'

describe('updateExample use-case', () => {
  const now = new Date()
  let clock: SinonFakeTimers

  beforeEach(() => {
    sinon.resetHistory()
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
    sinon.restore()
  })

  it('should update the example successfully', async () => {
    sinon
      .stub(FakeExampleRepository.prototype, 'getById')
      .resolves(new Example({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now }))
    sinon.stub(FakeExampleRepository.prototype, 'update').resolves()

    const changeName = new ChangeName(new FakeExampleRepository(), new FakeLogger())

    const result = await changeName.execute(ExampleDataInJSON.id, ExampleDataInJSON.name)

    expect({ ...result }).toStrictEqual({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now })
  })

  it('should fail creating a new example with incorrect parameters')
})
