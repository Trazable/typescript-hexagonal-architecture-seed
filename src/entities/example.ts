// BUSINESS ENTITY EXAMPLE
// NOT ONLY A DATA STORE

export interface IExample {
  id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  createdAt: Date
}
export class Example implements IExample {
  id: string
  name: string
  lastName: string
  phone: string
  hobbies: string[]
  createdAt: Date

  constructor({ id, name, lastName, phone, hobbies = [], createdAt }: IExample) {
    this.id = id
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
