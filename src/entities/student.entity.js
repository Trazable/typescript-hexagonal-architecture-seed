/**
 * StudentEntity
 *
 * @param {{ name: string, surname: string, age: number, height?: number }}
 */
const StudentEntity = function ({ name = '', surname = '', age = 0, height }) {
  this.name = name
  this.surname = surname
  this.age = age
  this.height = height
}

exports.StudentEntity = StudentEntity
