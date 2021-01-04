const ERROR = 2

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [ERROR, 'always', 90],
  },
}
