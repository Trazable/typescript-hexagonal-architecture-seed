import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IAuth } from '../../../../../ports/auth'

export class AuthenticationMiddleware {
  private readonly auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validate has an authentication header
    if (!req.headers.authorization) return res.status(StatusCodes.UNAUTHORIZED).end()

    // Extract Bearer token
    const bearerToken = req.headers.authorization.match(/Bearer (.*)/)
    if (!bearerToken) return res.status(StatusCodes.UNAUTHORIZED).end()

    // Verify the Bearer token
    try {
      const tokenPayload = await this.auth.verifyToken(bearerToken[1])

      if (!tokenPayload) return res.status(StatusCodes.UNAUTHORIZED).end()

      req.company = tokenPayload
      next()
    } catch {
      return res.status(StatusCodes.UNAUTHORIZED).end()
    }
  }
}
