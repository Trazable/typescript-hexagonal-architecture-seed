import { Message, PubSub, Subscription as PubSubSuscription } from '@google-cloud/pubsub'
import { ILogger } from '../../../../ports/logger'
import { SUBSCRIPTIONS_AND_TOPICS } from '../../../../constants'

/**
 * General abstraction to connect to subscriptions and execute a handler on message
 */
export class Subscription {
  private readonly pubSubClient: PubSub
  private readonly messageHandler: (message: Message) => Promise<void>
  private readonly logger: ILogger
  private readonly subscriptionName?: keyof typeof SUBSCRIPTIONS_AND_TOPICS

  constructor(
    pubSubClient: PubSub,
    messageHandler: (message: Message) => Promise<void>,
    logger: ILogger,
    subscriptionName?: keyof typeof SUBSCRIPTIONS_AND_TOPICS
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
        const subscription = await this.getPubSubSubscription(this.subscriptionName)
        // Subscription handler
        subscription.on('message', this.messageHandler)

        subscription.on('error', error => {
          this.logger.error(error)
        })
        subscription.on('close', () => {
          this.logger.error(`Subscription ${this.subscriptionName} closed`)
        })
      } catch (error) {
        if (error instanceof Error) this.logger.error(error?.stack || error.message)
      }
    }
  }

  /**
   *
   * @param topicName PUBSUB TOPIC
   * @param subscriptionName PUBSUB SUBSCRIPTION
   * @returns Returns a PUBSUB subscription, if the subscription and topic doesn't exists, then are created
   */
  private async getPubSubSubscription(
    subscriptionName: keyof typeof SUBSCRIPTIONS_AND_TOPICS
  ): Promise<PubSubSuscription> {
    // Retrieve the PUBSUB subscription
    const subscription = this.pubSubClient.subscription(subscriptionName)

    // Check if the subscriptions exists
    const [exists] = await subscription.exists()

    // Return the subscription
    if (exists) return subscription
    // Retrieve the TOPIC name by subscription
    const topicName = SUBSCRIPTIONS_AND_TOPICS[subscriptionName]

    // Create TOPIC if not exists
    await this.createTopicIfNotExists(topicName)

    this.logger.info(`Creating subscription ${subscriptionName} to the topic ${topicName}`)

    // Create the SUBSCRIPTION
    const [newSubscription] = await this.pubSubClient.createSubscription(topicName, subscriptionName, {
      retryPolicy: { minimumBackoff: { seconds: '10' }, maximumBackoff: { seconds: '600' } }, // Backoff delay => 10s up to 600s
      ackDeadlineSeconds: 60, // ACK Deadline 60 seconds
      messageRetentionDuration: { seconds: 604800 }, // Message retention duration => 7 days
      expirationPolicy: { ttl: null }, // Never expires
    })
    return newSubscription
  }

  private async createTopicIfNotExists(topicName: string): Promise<void> {
    const [topics] = await this.pubSubClient.getTopics()

    const topicsNames = topics.map(({ name }) => name.split('/')[name.split('/').length - 1])

    if (!topicsNames.includes(topicName)) {
      this.logger.info(`Creating the topic ${topicName}`)
      await this.pubSubClient.createTopic(topicName)
    }
  }
}
