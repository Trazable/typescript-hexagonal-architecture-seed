import { Message, PubSub, Subscription as PubSubSuscription } from '@google-cloud/pubsub'
import { ILogger } from '../../../../ports/logger'

/**
 * General abstraction to connect to subscriptions and execute a handler on message
 */
export class Subscription {
  private readonly pubSubClient: PubSub
  private readonly messageHandler: (message: Message) => Promise<void>
  private readonly logger: ILogger

  /**
   * This property must contain at the first parameter the subscription desired and at the second parameter their topic name
   */
  private readonly subscriptionAndTopic: [string, string]
  constructor(
    pubSubClient: PubSub,
    messageHandler: (message: Message) => Promise<void>,
    logger: ILogger,
    subscriptionAndTopic: [string, string]
  ) {
    this.pubSubClient = pubSubClient
    this.messageHandler = messageHandler
    this.logger = logger
    this.subscriptionAndTopic = subscriptionAndTopic
  }

  async initSubscription(): Promise<void> {
    if (this.subscriptionAndTopic) {
      try {
        // Subscriptions
        const subscription = await this.getPubSubSubscription(this.subscriptionAndTopic)
        // Subscription handler
        subscription.on('message', this.messageHandler)

        subscription.on('error', error => {
          this.logger.error(error)
        })

        subscription.on('close', () => {
          this.logger.warn(`Subscription ${this.subscriptionAndTopic} closed`)
        })

        process.on('SIGTERM', () => {
          this.logger.info('Closing subscription from SIGTERM received')
          subscription.close()
        })
      } catch (error) {
        if (error instanceof Error) this.logger.error(error?.stack || error.message)
      }
    }
  }

  /**
   *
   * @param subscriptionAndTopic PUBSUB SUBSCRIPTION AND TOPIC
   * @returns Returns a PUBSUB subscription, if the subscription and topic doesn't exists, then are created
   */
  private async getPubSubSubscription([subscription, topic]: [string, string]): Promise<PubSubSuscription> {
    // Retrieve the PUBSUB subscription
    const pubsubSubscription = this.pubSubClient.subscription(subscription)

    // Check if the subscriptions exists
    const [exists] = await pubsubSubscription.exists()

    // Return the subscription
    if (exists) return pubsubSubscription

    // Create TOPIC if not exists
    await this.createTopicIfNotExists(topic)

    this.logger.info(`Creating subscription ${subscription} to the topic ${topic}`)

    // Create the SUBSCRIPTION
    const [newSubscription] = await this.pubSubClient.createSubscription(topic, subscription, {
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
