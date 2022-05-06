import { PubSub } from '@google-cloud/pubsub'
import { ExampleHandler } from './message-handlers/example.handler'
import { ILogger } from '../../../../ports/logger'
import { Subscription } from './subscription'
import { SHOW_MESSAGE_SUBSCRIPTION } from '../../../../constants'

/*
 * Google PubSub configuration
 */
export class GooglePubSub {
  private readonly logger: ILogger
  private readonly pubSubClient: PubSub

  constructor(projectId: string, logger: ILogger) {
    this.logger = logger

    this.pubSubClient = new PubSub({ projectId })
  }

  /**
   * START pubsub subscriptions
   */
  async startSubscriptions(): Promise<void> {
    const exampleHandler = new ExampleHandler()

    await new Subscription(
      this.pubSubClient,
      exampleHandler.showMessageHandler,
      this.logger,
      SHOW_MESSAGE_SUBSCRIPTION
    ).initSubscription()
  }
}
