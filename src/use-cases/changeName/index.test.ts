/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import expect from 'expect'
import { ChangeName } from '.'
import { IExampleRepository } from '../../repositories/example.repository'
import { Example } from '../../entities/example'
import { ILogger } from '../../ports/logger'
import sinon from 'sinon'

describe('updateExample use-case', () => {
  beforeEach(() => {
    sinon.resetHistory()
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

    sinon.stub(FakeImpl.prototype, 'getById').returns(
      Promise.resolve(
        new Example({
          id: '123',
          name: 'Old Name',
          lastName: 'lastName',
          phone: '789',
          hobbies: [],
          createdAt: new Date(),
        })
      )
    )
    const stubUpdate = sinon.stub(FakeImpl.prototype, 'update').returns(Promise.resolve())
    const changeName = new ChangeName(new FakeImpl(), new FakeLogger())

    await changeName.execute('id', 'New Name')

    expect(stubUpdate.calledOnce).toBeTruthy()
    expect(
      stubUpdate.calledWithExactly(
        new Example({
          id: '123',
          name: 'New Name',
          lastName: 'lastName',
          phone: '789',
          hobbies: [],
          createdAt: new Date(),
        })
      )
    ).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
