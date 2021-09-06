/* eslint-disable @typescript-eslint/no-unused-vars */
import { IIDGenerator } from '../../src/ports/id-generator'

export class FakeIdGenerator implements IIDGenerator {
  generate(): string {
    throw new Error('Method not implemented.')
  }
}
