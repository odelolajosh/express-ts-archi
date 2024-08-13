import { Client } from "./client"

type DatabaseClient = unknown

class Database implements Client<unknown> {
  private _client: DatabaseClient

  /**
   * Create a database client
   * @constructor
   */
  constructor() {
    this._client = null
  }

  /**
   * Get the client instance
   * @returns DatabaseClient
   * @public
   */
  get client(): DatabaseClient {
    return this._client
  }

  /**
   * Check if the client is alive
   * @returns boolean
   * @public
   */
  async isAlive(): Promise<boolean> {
    return !!this._client
  }

  /**
   * Connect to the client
   * @public
   */
  async connect(): Promise<void> {
    this._client = {}
  }

  /**
   * Disconnect from the client
   * @public
   */
  async disconnect(): Promise<void> {
    this._client = null
  }
}

const database = new Database()

export { database }
