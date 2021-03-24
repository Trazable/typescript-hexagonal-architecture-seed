// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

/**
 * Port to manage logger tasks
 * @namespace queue
 */
export interface IQueue {
  /**
   * Publish message
   *
   * @param topicName - Topic name on publish the message
   * @param message - Message to publish  e.g. "Hello, world!" or JSON.stringify(someObject)
   * @returns The message Id
   */
  publish(topicName: string, message: string): Promise<string>
}
