/**
 * Add custom type declarations here
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import multer from 'multer'
import { addons } from './primary/rest/express/middlewares/addons'
/* eslint-enable @typescript-eslint/no-unused-vars */

// Add express request company authenticated payload
declare module 'express' {
  interface Request {
    company?: {
      _id: string
      email: string
      reference: string
    }
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    'correlation-id': string
  }
}

// Fix multer request handler to type the callback function error
declare module 'multer' {
  interface MulterRequestHandler {
    (req: Request, res: Response, callbackFunction: (error: Error) => void): void
  }

  interface Multer {
    any(): MulterRequestHandler
  }
}
