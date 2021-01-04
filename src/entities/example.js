// BUSINESS ENTITY EXAMPLE
// NOT ONLY A DATA STORE
class Example {
  /**
   *
   * @param {{ id: string, name: string, lastName: string, phone: number, hobbies: <string,number>[], createdAt: Date}}
   */
  constructor ({ id, name, lastName, phone, hobbies = [], createdAt }) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.hobbies = hobbies
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
   * @return {string[]}
   */
  get favoriteHobbies () {
    return this.hobbies.filter(hobby => Object.values(hobby)
      .some(value => value === Math.max(...this.hobbies
        .flatMap(hobby => Object.values(hobby)))))
      .map(favoriteHobby => Object.keys(favoriteHobby))
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
