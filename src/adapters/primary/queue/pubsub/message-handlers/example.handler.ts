import { Message } from '@google-cloud/pubsub'

import { ShowMessage } from '../../../../../use-cases/showMessage'

// This secondary adapter calls directly the useCases.
export class ExampleHandler {
  private readonly showMessageUseCase: ShowMessage

  constructor(showMessageUseCase: ShowMessage) {
    this.showMessageUseCase = showMessageUseCase
  }

  showMessageHandler = async (message: Message): Promise<void> => {
    const { data, ack } = message

    try {
      await this.showMessageUseCase.execute(JSON.parse(data.toString()))
      ack()
    } catch (error) {
      this.showMessageUseCase.logger.error(error.stack)
    }
  }
}
