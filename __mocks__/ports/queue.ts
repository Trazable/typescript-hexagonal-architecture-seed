/* eslint-disable @typescript-eslint/no-unused-vars */

import { IQueue } from '../../src/ports/queue'

export class FakeQueue implements IQueue {
  publish(message: string): Promise<string | undefined> {
    throw new Error('Method not implemented.')
  }
}
