import { PubSub } from '@google-cloud/pubsub'

import { ExampleHandler } from './message-handlers/example.handler'
import { ShowMessage } from '../../../../use-cases/showMessage'
import { ILogger } from '../../../../ports/logger'

// Subscriptions
import { ExampleSubscription } from './subscriptions/example.subscription'

/*
 * Google PubSub configuration
 */
export class GooglePubSub {
  private readonly showMessageUseCase: ShowMessage
  private readonly logger: ILogger
  private readonly pubSubClient: PubSub

  constructor(projectId: string, showMessageUseCase: ShowMessage, logger: ILogger) {
    this.showMessageUseCase = showMessageUseCase
    this.logger = logger

    this.pubSubClient = new PubSub({ projectId })

    this.setupSubscriptions()
  }

  /**
   * Setup pubsub subscriptions
   */
  private async setupSubscriptions() {
    const exampleHandler = new ExampleHandler(this.showMessageUseCase)

    await new ExampleSubscription(
      this.pubSubClient,
      exampleHandler.showMessageHandler,
      this.logger,
      process.env.SUBSCRIPTION_NAME
    ).initSubscription()
  }
}
