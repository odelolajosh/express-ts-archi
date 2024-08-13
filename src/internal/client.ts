/**
 * Client interface
 * A client subclass must implement this interface
 * @param T - client type
 */
export interface Client<T> {
  /**
   * Client instance
   */
  client: T | null

  /**
   * Connect to the client
   */
  connect(): Promise<void>

  /**
   * Disconnect from the client
   */
  disconnect(): Promise<void>

  /**
   * Check if the client is alive
   * @returns boolean
   */
  isAlive(): Promise<boolean>
}