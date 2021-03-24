import { IQueue } from '../../../ports/queue'
import { PubSub } from '@google-cloud/pubsub'

export class GoogleQueue implements IQueue {
  private readonly pubSubClient: PubSub

  constructor(projectId: string) {
    this.pubSubClient = new PubSub({ projectId })
  }

  async publish(topicName: string, message: string): Promise<string> {
    const dataBuffer = Buffer.from(message)

    return this.pubSubClient.topic(topicName).publish(dataBuffer)
  }
}
