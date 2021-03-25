import { MongoClient, Db } from 'mongodb'
import { Config } from '../../../config'
import { ILogger } from '../../../ports/logger'
import { ISecret } from '../../../ports/secret'

export class MongoManager {
  private client: MongoClient | undefined
  private readonly logger: ILogger
  private readonly secretManager: ISecret

  constructor(secretManager: ISecret, logger: ILogger) {
    this.client = undefined
    this.logger = logger
    this.secretManager = secretManager
  }

  async connect(): Promise<MongoClient | undefined> {
    try {
      // DOWNLOAD SECRETS
      const dataBaseSecrets = await this.getDataBaseSecrets()

      if (dataBaseSecrets) this.logger.info('Database variables downloaded from google cloud')

      this.client = new MongoClient(
        dataBaseSecrets?.DB_URI || Config.DB_URI || 'mongodb://mongo:27017/project_name?authSource=admin',
        {
          useUnifiedTopology: true,
          auth: {
            user: dataBaseSecrets?.DB_USER || Config.DB_USER || 'mongoadmin',
            password: dataBaseSecrets?.DB_PASSWORD || Config.DB_PASSWORD || 'secret',
          },
        }
      )

      // DESTROY SECRETS
      delete dataBaseSecrets?.DB_URI
      delete dataBaseSecrets?.DB_USER
      delete dataBaseSecrets?.DB_PASSWORD

      // CONNECT WITH THE DATABASE
      await this.client.connect()
      this.logger.info('Database connected')

      return this.client
    } catch (error) {
      this.logger.error('An error ocured connecting to the database')
      this.logger.error(error.stack)
    }
  }

  async closeConnection(): Promise<void> {
    try {
      this.client && this.client.close()
      this.client = undefined
    } catch (error) {
      this.logger.error(error.stack)
    }
  }

  getClient(): MongoClient | undefined {
    return this.client
  }

  getDatabase(): Db | undefined {
    return this.client && this.client.db()
  }

  isConnected(): boolean {
    let isConnected = false
    if (this.client) {
      isConnected = this.client.isConnected()
    }
    return isConnected
  }

  private async getDataBaseSecrets(): Promise<Record<string, string> | undefined> {
    return this.secretManager.getSecret(Config.SECRETS_BUCKET, Config.MONGO_VARIABLES_FILENAME)
  }
}
