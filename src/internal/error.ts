/**
 * Base class for all application errors.
 */
export abstract class ApplicationError<T> extends Error {
  abstract readonly statusCode: number
  abstract readonly logging: boolean
  abstract readonly errors: T[]

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, ApplicationError.prototype)
    this.name = this.constructor.name
  }
}
