// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

import { Example } from '../entities/example'

// REPOSITORY
// This interface (secondary port) follow the repository pattern instead the hexagonal architecture naming.
export interface IExampleRepository {
  /**
   * Save an example
   *
   * @param example - New Example to create
   */
  save(example: Example): Promise<void>

  /**
   * Get all examples
   *
   * @return All examples
   */
  getAll(): Promise<Example[]>

  /**
   * Get an example by id
   *
   * @return The example that match
   */
  getById(id: string): Promise<Example | undefined>

  /**
   * Get an example by name
   *
   * @return The example that match
   */
  getByName(name: string): Promise<Example | undefined>

  /**
   * Update an example
   */
  update(example: Example): Promise<void>
}
