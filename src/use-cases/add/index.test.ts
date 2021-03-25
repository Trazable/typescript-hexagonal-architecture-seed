/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expect from 'expect'
import { Add } from '.'
import sinon, { SinonFakeTimers } from 'sinon'
import { Example } from '../../entities/example'
import { IExampleRepository } from '../../repositories/example.repository'
import { ILogger } from '../../ports/logger'
import { IIDGenerator } from '../../ports/id-generator'
import { IQueue } from '../../ports/queue'

import ExampleDataInJSON from '../../../__mocks__/example/add/example-data-in.json'
import ExampleDataOutJSON from '../../../__mocks__/example/add/example-data-out.json'

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
    class FakeExampleRepository implements IExampleRepository {
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
        return Promise.resolve(undefined)
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

    class FakeIdGenerator implements IIDGenerator {
      generate(): string {
        throw new Error('Method not implemented.')
      }
    }

    class FakeQueue implements IQueue {
      publish(topicName: string, message: string): Promise<string> {
        throw new Error('Method not implemented.')
      }
    }

    const stubSave = sinon.stub(FakeExampleRepository.prototype, 'save')

    sinon.stub(FakeExampleRepository.prototype, 'getByName').resolves()
    sinon.stub(FakeIdGenerator.prototype, 'generate').returns('123')
    sinon.stub(FakeQueue.prototype, 'publish').resolves()

    const addUseCase = new Add(new FakeExampleRepository(), new FakeLogger(), new FakeIdGenerator(), new FakeQueue())

    const result = await addUseCase.execute(ExampleDataInJSON)

    expect({ ...result }).toStrictEqual({ ...ExampleDataOutJSON, createdAt: now, updatedAt: now })
  })

  it('should fail creating a new example with incorrect parameters')
})
