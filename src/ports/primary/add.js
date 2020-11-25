// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example')

class IAdd {
  /**
   *
   * @param {Example} example
   * @return {Promise<Example>} example
   */
  async execute (example) {
    return Promise.reject(new Error('Method execute not implemented'))
  }

  /**
   * @return {*} //TODO:
   */
  getContainerLogger () {
    return new Error('Method getContainerLogger not implemented')
  }
}

module.exports = IAdd
