import { IIDGenerator } from '../../ports/id-generator'
import { nanoid } from 'nanoid'

export class NanoIdGenerator implements IIDGenerator {
  generate(): string {
    return nanoid()
  }
}
