/**
 * Add custom type declarations here
 */

declare namespace Express {
  export interface Request {
    company?: {
      _id: string
      reference: string
      email: string
    }
  }
}
