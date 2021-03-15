import { Example, IExample } from '../../../../../entities/example'

/**
 *
 */
export class ExampleDTO {
  example: Example
  constructor(example: Example) {
    this.example = example
  }

  toJSON(): Pick<IExample, 'name'> {
    return {
      name: this.example.name,
    }
  }
}
