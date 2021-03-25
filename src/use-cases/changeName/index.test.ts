/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import expect from 'expect'
import { ChangeName } from '.'
import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'
import sinon, { SinonFakeTimers } from 'sinon'

import ExampleDataInJSON from '../../../__mocks__/example/changeName/example-data-in.json'
import ExampleDataOutJSON from '../../../__mocks__/example/changeName/example-data-out.json'

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
    class FakeImpl implements IExampleRepository {
      save(example: Example): Promise<void> {
        throw new Error('Method not implemented.')
      }

      getAll(): Promise<Example[]> {
        return Promise.resolve([])
      }

      getById(id: string): Promise<Example | undefined> {
        throw new Error('Method not implemented.')
      }

      getByName(name: string): Promise<Example | undefined> {
        throw new Error('Method not implemented.')
      }

      update(example: Example): Promise<void> {
        throw new Error('Method not implemented.')
      }
    }

    class FakeLogger implements ILogger {
      info(message: string): void {
        console.log(message)
      }

      error(message: string): void {
        console.log(message)
      }

      warn(message: string): void {
        console.log(message)
      }
    }

    sinon
      .stub(FakeImpl.prototype, 'getById')
      .resolves(new Example({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now }))
    sinon.stub(FakeImpl.prototype, 'update').resolves()
    const changeName = new ChangeName(new FakeImpl(), new FakeLogger())

    const result = await changeName.execute(ExampleDataInJSON.id, ExampleDataInJSON.name)

    expect({ ...result }).toStrictEqual({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now })
  })

  it('should fail creating a new example with incorrect parameters')
})
