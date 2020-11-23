class Example {
  /**
   *
   * @param {{ id: string, name: string, lastName: string, phone: number, createdAt: Date}}
   */
  constructor ({ name, lastName, phone, createdAt }) {
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.createdAt = createdAt
  }

  get nameAndLastName () {
    return `${this.name} ${this.lastName}`
  }
}

module.exports = Example
