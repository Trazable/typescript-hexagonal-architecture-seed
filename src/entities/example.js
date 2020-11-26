// BUSINESS ENTITY EXAMPLE
// NOT ONLY A DATA STORE
class Example {
  /**
   *
   * @param {{ id: string, name: string, lastName: string, phone: number, createdAt: Date}}
   */
  constructor ({ id, name, lastName, phone, createdAt }) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.createdAt = createdAt
  }

  /**
   * @return {string}
   */
  get nameAndLastName () {
    return `${this.name} ${this.lastName}`
  }

  /**
   *
   * @param {string} name
   */
  changeName (name) {
    this.name = name
  }
}

module.exports = Example
