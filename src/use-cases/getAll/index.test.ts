/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expect from 'expect'
import { GetAll } from '.'
import { IExampleRepository } from '../../repositories/example.repository'
import sinon from 'sinon'
import { IExample, Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'

describe('getAllExamples use-case', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should get all examples successfully', async () => {
    const expectedResult = [
      new Example({ name: 'Name1' } as IExample),
      new Example({ name: 'Name2' } as IExample),
      new Example({ name: 'Name3' } as IExample),
    ]

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

    const stub = sinon.stub(FakeImpl.prototype, 'getAll').returns(Promise.resolve(expectedResult))
    const getAllUseCase = new GetAll(new FakeImpl(), new FakeLogger())

    const examples = await getAllUseCase.execute()

    expect(examples).toStrictEqual(expectedResult)
    expect(stub.calledOnceWith()).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
