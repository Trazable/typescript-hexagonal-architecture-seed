import { Message } from '@google-cloud/pubsub'
import Container from 'typedi'
import { MessageAttributes } from '../../../../../ports/queue'
import { ShowMessage } from '../../../../../use-cases/showMessage'

// This secondary adapter calls directly the useCases.
export class ExampleHandler {
  private readonly showMessageUseCase = Container.get(ShowMessage)

  showMessageHandler = async (message: Message): Promise<void> => {
    try {
      const messageAttributes = message.attributes as MessageAttributes

      this.showMessageUseCase.logger.setCorrelationId(messageAttributes.correlationId)
      await this.showMessageUseCase.execute(JSON.parse(message.data.toString()))
      message.ack()
    } catch (error) {
      if (error instanceof Error) this.showMessageUseCase.logger.error(error?.stack || error.message)
    }
  }
}
