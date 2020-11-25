// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example')

class IChangeName {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @return {Promise<Example>} example
   */
  async execute (id, name) {
    return Promise.reject(new Error('Method execute not implemented'))
  }

  /**
   * @return {*} //TODO:
   */
  getContainerLogger () {
    return new Error('Method getContainerLogger not implemented')
  }
}

module.exports = IChangeName
