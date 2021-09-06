// Business exception
// Create a custom class to manage in the secondary adapter the instance of the error to return a custom message.
// The use of this entity are in the folder src/adapters/primary/rest/express/manage-error.js
export class NotFoundError extends Error {
  readonly message: string
  readonly severity: string

  constructor(message = 'Not found') {
    super(message)
    this.message = message
    this.severity = 'warn'
  }
}
