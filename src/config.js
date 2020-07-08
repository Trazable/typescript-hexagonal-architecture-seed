/**
 * Global Configuration
 */
module.exports = {
  DATASOURCES: {
    MONGODB: {
      DB_URL: 'mongodb://localhost:27017',
      DB_NAME: 'hexagonal',
    }
  },

  INTERACTORS: {
    REST: {
      PORT: 3000,
    },
  },
}