// eslint-disable-next-line no-unused-vars
const Example = require('../../../../../entities/example')

/**
 *
 */
class ExampleDTO {
  /**
  *
  * @param {Example} example
  */
  constructor (example) {
    this.example = example
  }

  toJSON () {
    return {
      ...this.example,
      id: undefined,
      createdAt: undefined,
      hobbies: undefined,
      favoriteHobbies: this.example.favoriteHobbies,
    }
  }
}

module.exports = ExampleDTO
