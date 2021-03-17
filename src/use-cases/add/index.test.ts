/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expect from 'expect'
import { Add } from '.'
import sinon, { SinonFakeTimers } from 'sinon'
import { Example } from '../../entities/example'
import { ObjectId } from 'mongodb'
import { IExampleRepository } from '../../repositories/example.repository'
import { ILogger } from '../../ports/logger'

describe('addExample use-case', () => {
  const now = new Date()
  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
  })

  it('should create a new example successfully', async () => {
    const entryExampleData = new Example({
      _id: '123',
      name: 'Example Name',
      lastName: 'Example lastName',
      phone: '123',
      hobbies: [],
      createdAt: now,
    })

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

    const expectedResult = new Example({
      _id: '123',
      name: 'Example Name',
      lastName: 'Example lastName',
      phone: '123',
      hobbies: [],
      createdAt: now,
    })

    sinon.stub(ObjectId.prototype, 'toHexString').returns('123')

    const stubSave = sinon.stub(FakeImpl.prototype, 'save')
    sinon.stub(FakeImpl.prototype, 'getByName').returns(Promise.resolve(undefined))

    const addUseCase = new Add(new FakeImpl(), new FakeLogger())

    const example = await addUseCase.execute(entryExampleData)

    expect(example).toStrictEqual(expectedResult)
    expect(
      stubSave.calledOnceWith(
        new Example({
          _id: '123',
          name: 'Example Name',
          lastName: 'Example lastName',
          phone: '123',
          hobbies: [],
          createdAt: now,
        })
      )
    ).toBeTruthy()
  })

  it('should fail creating a new example with incorrect parameters')
})
