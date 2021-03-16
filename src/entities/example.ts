// BUSINESS ENTITY EXAMPLE
// NOT ONLY A DATA STORE

export interface IExample {
  _id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  createdAt: Date
}
export class Example implements IExample {
  _id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  createdAt: Date

  constructor({ _id, name, lastName, phone, hobbies = [], createdAt }: IExample) {
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.hobbies = hobbies
    this.createdAt = createdAt
  }

  get nameAndLastName(): string {
    return `${this.name} ${this.lastName}`
  }

  changeName(name: string): void {
    this.name = name
  }
}
