import { Message } from '@google-cloud/pubsub'
import { MessageAtributes } from '../../../../../ports/queue'

import { ShowMessage } from '../../../../../use-cases/showMessage'

// This secondary adapter calls directly the useCases.
export class ExampleHandler {
  private readonly showMessageUseCase: ShowMessage

  constructor(showMessageUseCase: ShowMessage) {
    this.showMessageUseCase = showMessageUseCase
  }

  showMessageHandler = async (message: Message): Promise<void> => {
    try {
      const messageAttributes = message.attributes as MessageAtributes

      this.showMessageUseCase.logger.setCorrelationId(messageAttributes.correlationId)
      await this.showMessageUseCase.execute(JSON.parse(message.data.toString()))
      message.ack()
    } catch (error) {
      this.showMessageUseCase.logger.error(error.stack)
    }
  }
}
