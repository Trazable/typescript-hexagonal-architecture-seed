/**
 * Example Repository Interface
 * This "interface" is the contract repository, must have all datasource methods and serve as a template.
 * The datasources must extend from it.
 *
 * In case of calling a method and it is not "implemented" or extended in the datasource, the repository will thrown an error.
 */
function ExampleRepository () {}

/**
 *
 * @param {*} example
 */
ExampleRepository.prototype.save = function (example) {
  return Promise.reject(new Error('Method save not implemented'))
}

/**
 *
 * @param {*} example
 */
ExampleRepository.prototype.getAll = function (example) {
  return Promise.reject(new Error('Method getAll not implemented'))
}

/**
 * @name update
 * @description Atomic update
 *
 * @param {string} exampleId document id
 * @param {any} example
 * @returns {Promise<any>} the full document updated
 */
ExampleRepository.prototype.update = function (exampleId, example) {
  return Promise.reject(new Error('Method update not implemented'))
}

module.exports = ExampleRepository
