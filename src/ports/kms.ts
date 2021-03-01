// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
export interface IKeyManagement {
  encrypt(plaintext: string): Promise<string | undefined>

  decrypt(cipherText: Buffer): Promise<string | undefined>
}
