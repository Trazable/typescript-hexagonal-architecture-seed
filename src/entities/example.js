class Example {
  /**
   *
   * @param {string} name
   * @param {string} lastName
   * @param {number} phone
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
