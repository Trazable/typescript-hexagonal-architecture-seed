export const Config = {
  // GENERAL
  NODE_ENV: process.env.NODE_ENV, // Node environment

  // GOOGLE
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID, // Google Cloud project id

  // STORAGE
  SECRETS_BUCKET: process.env.SECRETS_BUCKET, // Google Bucket name with the secrets

  // DATABASE
  MONGO_VARIABLES_FILENAME: process.env.MONGO_VARIABLES_FILENAME, // Name of the mongo environment variables file encrypted (mongo-variables.json.encrypted)

  // KMS
  KMS_KEYRING: process.env.KMS_KEYRING, // Google cloud keyring
  KMS_KEY_CREDENTIALS: process.env.KMS_KEY_CREDENTIALS, // Key for the environment variables (environment-variables)
  KMS_LOCATION: process.env.KMS_LOCATION, // Keyring location
  KMS_KEY_WALLETS: process.env.KMS_KEY_WALLETS, // Wallets key (wallets)

  // PUBSUB
  SUBSCRIPTION_NAME: process.env.SUBSCRIPTION_NAME,

  AUTH_URL: process.env.AUTH_URL, // Trazable Microservice Auth URL
  PORT: process.env.PORT, // Port on serve http primary adapter // default 8080
  DB_URI: process.env.DB_URI, // Optional env variable if no secret is provided
  DB_USER: process.env.DB_USER, // Optional env variable if no secret is provided
  DB_PASSWORD: process.env.DB_PASSWORD, // Optional env variable if no secret is provided
}
