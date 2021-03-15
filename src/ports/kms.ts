// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

/**
 * Port to manage crypto tasks
 * @namespace kms
 */
export interface IKeyManagement {
  /**
   * Encrypt some plain text
   *
   * @param plaintext The text to encrypt
   * @returns cipherText
   */
  encrypt(plaintext: string | Uint8Array): Promise<string | Uint8Array | undefined>

  /**
   * Decrypt some plain text
   *
   * @param plaintext The text to encrypt
   * @returns plaintext
   */
  decrypt(cipherText: string | Uint8Array): Promise<string | Uint8Array | undefined>
}
