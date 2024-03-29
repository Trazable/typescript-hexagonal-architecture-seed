// LOGGER CONSTANTS
export const DATABASE_LOGGER = 'DATABASE'
export const EXPRESS_API_LOGGER = 'EXPRESS_API'
export const PUBSUB_LOGGER = 'PUBSUB'
export const APPLICATION_LOGGER = 'APPLICATION'

export enum USE_CASES_LOGGER {
  ADD_USE_CASE_LOGGER = 'ADD_USE_CASE_LOGGER',
  GET_ALL_USE_CASE_LOGGER = 'GET_ALL_USE_CASE_LOGGER',
  CHANGE_NAME_USE_CASE_LOGGER = 'CHANGE_NAME_USE_CASE_LOGGER',
  SHOW_MESSAGE_USE_CASE_LOGGER = 'SHOW_MESSAGE_USE_CASE_LOGGER',
}

// REPOSITORIES
export const EXAMPLE_REPOSITORY = 'EXAMPLE_REPOSITORY'

// PUBSUB CONSTANTS
// SUBSCRIPTION
export const SHOW_MESSAGE_SUBSCRIPTION = 'SHOW_MESSAGE_SUBSCRIPTION'
// TOPIC
export const MESSAGE_PUBLISHED_TOPIC = 'MESSAGE_PUBLISHED_TOPIC'

// QUEUE AND TOPICS
export const SUBSCRIPTIONS_AND_TOPICS = {
  [SHOW_MESSAGE_SUBSCRIPTION]: MESSAGE_PUBLISHED_TOPIC,
}

// SECONDARY ADAPTERS
export const ID_GENERATOR = 'ID_GENERATOR'
export const QUEUE_PUBLISHER = 'QUEUE_PUBLISHER'
