import { IQueue, MessageAtributes } from '../../../ports/queue'
import { PubSub } from '@google-cloud/pubsub'
import { ILogger } from '../../../ports/logger'

export class PubsubPublisher implements IQueue {
  private readonly pubSubClient: PubSub
  private readonly topicName: string
  private readonly logger: ILogger

  constructor(topicName: string, projectId: string, logger: ILogger) {
    this.pubSubClient = new PubSub({ projectId })
    this.topicName = topicName
    this.logger = logger
  }

  async publish(message: string, attributes: MessageAtributes): Promise<string | undefined> {
    let messageId
    try {
      await this.createTopicIfNotExists(this.topicName)
      const dataBuffer = Buffer.from(this.addVersionAndCorrelationId(message))
      messageId = await this.pubSubClient.topic(this.topicName).publish(dataBuffer, {
        ...attributes,
        ...(this.logger.getCorrelationId() ? { correlationId: this.logger.getCorrelationId() } : {}),
        microserviceTrigger: 'project_name',
      } as MessageAtributes)
      this.logger.info(`Message published on topic ${this.topicName} succesfully with ID: ${messageId}`)
    } catch (error) {
      this.logger.error(error.stack)
    }

    return messageId
  }

  private async createTopicIfNotExists(topicName: string) {
    const [topics] = await this.pubSubClient.getTopics()

    const topicsNames = topics.map(({ name }) => name.split('/')[name.split('/').length - 1])
    if (!topicsNames.includes(topicName)) await this.pubSubClient.createTopic(topicName)
  }

  /**
   *
   * @param message
   * @returns
   */
  private addVersionAndCorrelationId(message: string): string {
    return JSON.stringify({
      version: '1',
      correlationId: this.logger.getCorrelationId(),
      ...JSON.parse(message),
    })
  }
}
