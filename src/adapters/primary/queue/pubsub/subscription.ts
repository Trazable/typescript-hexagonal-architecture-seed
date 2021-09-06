import { Message, PubSub } from '@google-cloud/pubsub'
import { ILogger } from '../../../../ports/logger'

/**
 * General abstraction to connect to subscriptions and execute a handler on message
 */
export class Subscription {
  private readonly pubSubClient: PubSub
  private readonly messageHandler: (message: Message) => Promise<void>
  private readonly logger: ILogger
  private readonly subscriptionName?: string

  constructor(
    pubSubClient: PubSub,
    messageHandler: (message: Message) => Promise<void>,
    logger: ILogger,
    subscriptionName?: string
  ) {
    this.pubSubClient = pubSubClient
    this.messageHandler = messageHandler
    this.logger = logger
    this.subscriptionName = subscriptionName
  }

  initSubscription(): void {
    if (this.subscriptionName) {
      // Subscriptions
      const subscription = this.pubSubClient.subscription(this.subscriptionName)

      // Subscription handler
      subscription.on('message', this.messageHandler)
      subscription.on('error', error => {
        this.logger.error(error.details)
      })
    }
  }
}
