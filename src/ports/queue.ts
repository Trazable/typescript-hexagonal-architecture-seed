export enum MessageAttributeOperation {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type MessageAtributes = {
  version: string
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
   * @param attributes - Message attributes to publish
   * @returns The message Id
   */
  publish(message: string, attributes: MessageAtributes): Promise<string | undefined>
}
