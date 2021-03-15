import { Example, IExample } from '../../../../../entities/example'

/**
 *
 */
export class ExampleDTO {
  private readonly example: Example

  constructor(example: Example) {
    this.example = example
  }

  toJSON(): Pick<IExample, 'name'> {
    return {
      name: this.example.name,
    }
  }
}
