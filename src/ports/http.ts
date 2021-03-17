export type HttpConfig = {
  headers: { [key: string]: string }
}

export interface IHttp {
  /**
   * Make a Get HTTP action
   *
   * @param url URL path
   * @returns The user specified response
   */
  get<T>(url: string, config?: HttpConfig): Promise<T>
}
