import { Message, PubSub } from '@google-cloud/pubsub'
import { ILogger } from '../../../../../ports/logger'

export class ExampleSubscription {
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

  async initSubscription(): Promise<void> {
    if (this.subscriptionName) {
      try {
        // Subscriptions
        const subscription = this.pubSubClient.subscription(this.subscriptionName)
        const [exist] = await subscription.exists()

        if (exist) {
          // Subscription handler
          subscription.on('message', this.messageHandler)
        } else {
          this.logger.error(`${this.subscriptionName} subscription not exist`)
        }
      } catch (error) {
        this.logger.error(error.stack)
        this.logger.error('Error setting up pubsub handlers')
      }
    } else {
      this.logger.error('ExampleSubscription: subscriptionName not provided')
    }
  }
}
