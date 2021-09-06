/* eslint-disable @typescript-eslint/no-unused-vars */

import { ISecret } from '../../src/ports/secret'

export class FakeSecret implements ISecret {
  getSecret(bucketName: string | undefined, fileName: string | undefined): Promise<Record<string, string> | undefined> {
    throw new Error('Method not implemented.')
  }
}
