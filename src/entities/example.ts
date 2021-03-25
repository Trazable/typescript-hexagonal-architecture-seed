// BUSINESS ENTITY EXAMPLE
// NOT ONLY A DATA STORE

export interface IExample {
  _id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  updatedAt: Date
  readonly createdAt: Date
}
export class Example implements IExample {
  readonly _id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  updatedAt: Date
  readonly createdAt: Date

  constructor({ _id, name, lastName, phone, hobbies = [], updatedAt, createdAt }: IExample) {
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.hobbies = hobbies
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }

  get nameAndLastName(): string {
    return `${this.name} ${this.lastName}`
  }

  changeName(name: string): void {
    this.name = name
  }
}
