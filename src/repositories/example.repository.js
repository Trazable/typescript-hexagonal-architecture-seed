/**
 * Example Repository Interface
 * This "interface" is the contract repository, must have all datasource methods and serve as a template.
 * The datasources must extend from it.
 *
 * In case of calling a method and it is not "implemented" or extended in the datasource, the repository will thrown an error.
 */
function ExampleRepository () {}

/**
 * @name save
 * @description save a new example document
 *
 * @param {any} example
 * @returns {Promise<any>} the example document saved in db
 */
ExampleRepository.prototype.save = function (example) {
  return Promise.reject(new Error('Method save not implemented'))
}

/**
 * @name getAll
 * @description Get all example documents
 *
 *
 * @returns {Promise<any[]>} all example documents
 */
ExampleRepository.prototype.getAll = function () {
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
