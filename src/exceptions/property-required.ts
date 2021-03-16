// Business exception
// Create a custom class to manage in the secondary adapter the instance of the error to return a custom message.
// The use of this entity are in the folder src/adapters/primary/rest/express/manage-error.js
export class PropertyRequiredError extends Error {
  readonly propertyName: string

  constructor(propertyName: string) {
    super(`Property ${propertyName} is required`)

    this.propertyName = propertyName
  }
}
