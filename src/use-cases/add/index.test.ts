/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expect from 'expect'
import { Add } from '.'
import sinon, { SinonFakeTimers } from 'sinon'

import ExampleDataInJSON from '../../../__mocks__/example/add/example-data-in.json'
import ExampleDataOutJSON from '../../../__mocks__/example/add/example-data-out.json'
import { FakeIdGenerator } from '../../../__mocks__/ports/id-generator'
import { FakeQueue } from '../../../__mocks__/ports/queue'
import { FakeLogger } from '../../../__mocks__/ports/logger'
import { FakeExampleRepository } from '../../../__mocks__/repositories/example.repository'

describe('addExample use-case', () => {
  const now = new Date('2000-01-01')
  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
  })

  it('should create a new example successfully', async () => {
    const stubSave = sinon.stub(FakeExampleRepository.prototype, 'save')

    sinon.stub(FakeExampleRepository.prototype, 'getByName').resolves()
    sinon.stub(FakeIdGenerator.prototype, 'generate').returns('123')
    sinon.stub(FakeQueue.prototype, 'publish').resolves()
    sinon.stub(FakeLogger.prototype, 'info')

    const addUseCase = new Add(new FakeExampleRepository(), new FakeLogger(), new FakeIdGenerator(), new FakeQueue())

    const result = await addUseCase.execute(ExampleDataInJSON)

    expect({ ...result }).toStrictEqual({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now })
  })

  it('should fail creating a new example with incorrect parameters')
})
