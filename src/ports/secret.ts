// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.

/**
 * Port to manage secrets
 *
 * @namespace secret
 */
export interface ISecret {
  /**
   * Get the secrets
   *
   * @param bucketName - Name where the secret is saved
   * @param fileName - Secret filename
   * @returns The secrets
   */
  getSecret(bucketName: string | undefined, fileName: string | undefined): Promise<Record<string, string> | undefined>
}
