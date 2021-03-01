// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

// eslint-disable-next-line no-unused-vars

import { Example } from '../entities/example'

// REPOSITORY
// This interface (secondary port) follow the repository pattern instead the hexagonal architecture naming.
export interface IExampleRepository {
  save(example: Example): Promise<void>

  getAll(): Promise<Example[]>

  getById(id: string): Promise<Example | undefined>

  getByName(name: string): Promise<Example | undefined>

  update(example: Example): Promise<void>
}
