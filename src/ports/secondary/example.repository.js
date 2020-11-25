// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example.js')

class ExampleRepository {
  /**
   *
   * @param {Example} example
   * @return {Promise<Example>} example
   */
  async save (example) {
    return Promise.reject(new Error('Method save not implemented'))
  }

  /**
   * @return {Promise<Example[]>}
   */
  async getAll () {
    return Promise.reject(new Error('Method getAll not implemented'))
  }

  /**
   * @param {string}
   * @return {Promise<Example>}
   */
  async getById (id) {
    return Promise.reject(new Error('Method getById not implemented'))
  }

  /**
   * @param {string} name
   * @return {Promise<Example>}
   */
  async getByName (name) {
    return Promise.reject(new Error('Method getByName not implemented'))
  }

  /**
   * @param {string} id
   * @param {string} name
   * @return {Promise<Example>}
   */
  async update (id, name) {
    return Promise.reject(new Error('Method update not implemented'))
  }
}

module.exports = ExampleRepository
