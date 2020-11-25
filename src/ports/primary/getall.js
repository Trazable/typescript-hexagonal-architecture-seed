// eslint-disable-next-line no-unused-vars
const Example = require('../../entities/example')

class IGetAll {
  /**
   * @return {Promise<Example[]>} examples
   */
  async execute () {
    return Promise.reject(new Error('Method execute not implemented'))
  }

  /**
   * @return {*} //TODO:
   */
  getContainerLogger () {
    return new Error('Method getContainerLogger not implemented')
  }
}

module.exports = IGetAll
