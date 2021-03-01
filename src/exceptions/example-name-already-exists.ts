// Business exception
// Create a custom class to manage in the secondary adapter the instance of the error to return a custom message.
// The use of this entity are in the folder src/adapters/primary/rest/express/manage-error.js
export class NameAlreadyExists extends Error {}
