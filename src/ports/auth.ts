export interface IAuth {
  verifyToken(token: string): Promise<{ _id: string; reference: string; email: string }>
}
