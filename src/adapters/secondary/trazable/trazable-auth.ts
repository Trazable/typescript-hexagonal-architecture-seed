import { IAuth } from '../../../ports/auth'
import { IHttp } from '../../../ports/http'

export class TrazableAuth implements IAuth {
  private readonly http: IHttp
  private readonly authURL?: string
  private readonly FAKE_TOKEN_PAYLOAD = {
    _id: '0',
    reference: 'ES00000000',
    email: 'fake@company.com',
  }

  constructor(http: IHttp, authURL?: string) {
    this.http = http
    this.authURL = authURL
  }

  verifyToken = async (token: string): Promise<{ _id: string; reference: string; email: string }> => {
    return this.authURL ? await this.verifyTokenWithAuthMicroservice(token) : this.FAKE_TOKEN_PAYLOAD
  }

  private verifyTokenWithAuthMicroservice = async (
    token: string
  ): Promise<{ _id: string; reference: string; email: string }> => {
    const tokenPayload = await this.http.get<{ _id: string; reference: string; email: string }>(
      `${this.authURL}/verify`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return tokenPayload
  }
}
