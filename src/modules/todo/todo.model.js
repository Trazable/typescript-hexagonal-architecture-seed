/**
 * Create a Todo Entity
 * 
 * @param {{ title: string, text: string, createdAt?: number }} params 
 * 
 * @returns {Todo} Todo
 */
exports.makeTodo = ({
  title,
  text,
  createdAt = Date.now(),
}) => {
  // Model Checkers
  if (!title) {
    throw new Error('Todo must have a title.')
  }
  if (!text) {
    throw new Error('Todo must have a text.')
  }

  return {
    title,
    text,
    createdAt,
  }
}