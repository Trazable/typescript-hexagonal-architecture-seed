/**
 * ID Generator port interface
 */
export interface IIDGenerator {
  /**
   * Genereta a new id
   *
   * @returns The new id generated
   */
  generate(): string
}
