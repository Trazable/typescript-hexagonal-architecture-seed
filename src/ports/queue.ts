export enum MessageAttributeOperation {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type MessageAttributes = {
  version: string
  addons?: string
  correlationId?: string
  companyId: string
  microserviceTrigger?: string
  collection: string
  operation: MessageAttributeOperation
}

/**
 * @namespace queue
 */
export interface IQueue {
  /**
   * Publish message
   *
   * @param topicName - Topic name on publish the message
   * @param message - Message to publish
   * @param attributes - Message attributes to publish
   * @returns The message Id
   */
  publish(topicName: string, message: string, attributes: MessageAttributes): Promise<string | undefined>
}
