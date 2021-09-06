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
import { FakeExampleRepository } from '../../../__mocks__/repositories/example.repository'
import { FakeLogger } from '../../../__mocks__/ports/logger'

describe('getAllExamples use-case', () => {
  const now = new Date('2000-01-01')

  beforeEach(() => {
    sinon.restore()
  })

  it('should get all examples successfully', async () => {
    sinon
      .stub(FakeExampleRepository.prototype, 'getAll')
      .resolves(ExampleDataOutJSON.map(example => new Example({ ...example, createdAt: now, updatedAt: now })))
    sinon.stub(FakeLogger.prototype, 'info')
    const getAllUseCase = new GetAll(new FakeExampleRepository(), new FakeLogger())

    const examples = await getAllUseCase.execute()

    expect(examples.map(example => ({ ...example }))).toStrictEqual(
      ExampleDataOutJSON.map(example => ({ ...example, createdAt: now, updatedAt: now }))
    )
  })

  it('should fail creating a new example with incorrect parameters')
})
