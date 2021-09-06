/* eslint-disable @typescript-eslint/no-unused-vars */
import { Example } from '../../src/entities/example'
import { IExampleRepository } from '../../src/repositories/example.repository'

export class FakeExampleRepository implements IExampleRepository {
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
