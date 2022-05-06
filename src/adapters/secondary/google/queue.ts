import { IQueue, MessageAttributes } from '../../../ports/queue'
import { PubSub } from '@google-cloud/pubsub'
import { ILogger } from '../../../ports/logger'

export class PubsubPublisher implements IQueue {
  private readonly pubSubClient: PubSub
  private readonly logger: ILogger

  constructor(projectId: string, logger: ILogger) {
    this.pubSubClient = new PubSub({ projectId })
    this.logger = logger
  }

  async publish(
    topicName: string,
    message: string,
    { correlationId, ...attributes }: MessageAttributes
  ): Promise<string | undefined> {
    let messageId
    try {
      messageId = await this.pubSubClient.topic(topicName).publish(Buffer.from(message), {
        ...attributes,
        ...(correlationId || this.logger.getCorrelationId()
          ? { correlationId: correlationId || this.logger.getCorrelationId() }
          : {}),
        microserviceTrigger: 'EXAMPLE',
      } as MessageAttributes)
      this.logger.info(`Message published on topic ${topicName} succesfully`)
      this.logger.info(message)
    } catch (error) {
      if (error instanceof Error) this.logger.error(error?.stack || error.message)
    }

    return messageId
  }
}
