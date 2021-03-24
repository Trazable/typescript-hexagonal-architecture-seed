import { Example, IExample } from '../../../entities/example'

/**
 *
 */
export class ExampleDTO {
  private readonly example: Example

  constructor(example: Example) {
    this.example = example
  }

  toJSON(): Pick<IExample, '_id' | 'name'> {
    return {
      _id: this.example._id,
      name: this.example.name,
    }
  }
}
