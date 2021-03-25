/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expect from 'expect'
import { GetAll } from '.'
import { IExampleRepository } from '../../repositories/example.repository'
import sinon from 'sinon'
import { IExample, Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'

import ExampleDataInJSON from '../../../__mocks__/example/getAll/example-data-in.json'
import ExampleDataOutJSON from '../../../__mocks__/example/getAll/example-data-out.json'

describe('getAllExamples use-case', () => {
  const now = new Date('2000-01-01')

  beforeEach(() => {
    sinon.restore()
  })

  it('should get all examples successfully', async () => {
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
      .stub(FakeImpl.prototype, 'getAll')
      .resolves(ExampleDataOutJSON.map(example => new Example({ ...example, createdAt: now, updatedAt: now })))
    const getAllUseCase = new GetAll(new FakeImpl(), new FakeLogger())

    const examples = await getAllUseCase.execute()

    expect(examples.map(example => ({ ...example }))).toStrictEqual(
      ExampleDataOutJSON.map(example => ({ ...example, createdAt: now, updatedAt: now }))
    )
  })

  it('should fail creating a new example with incorrect parameters')
})
