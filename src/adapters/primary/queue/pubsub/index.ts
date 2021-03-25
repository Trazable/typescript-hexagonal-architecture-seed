import { PubSub } from '@google-cloud/pubsub'

import { ExampleHandler } from './message-handlers/example.handler'
import { ShowMessage } from '../../../../use-cases/showMessage'
import { ILogger } from '../../../../ports/logger'

import { Subscription } from './subscription'
import { Config } from '../../../../config'

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
  }

  /**
   * START pubsub subscriptions
   */
  async startSubscriptions(): Promise<void> {
    const exampleHandler = new ExampleHandler(this.showMessageUseCase)

    await new Subscription(
      this.pubSubClient,
      exampleHandler.showMessageHandler,
      this.logger,
      Config.SUBSCRIPTION_NAME
    ).initSubscription()
  }
}
