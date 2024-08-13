import { ApplicationError } from "./error"

type HttpsErrorContent = {
  message: string
  context: { [key: string]: any }
};

type HttpErrorParams = {
  code?: number
  message?: string
  logging?: boolean
  context?: { [key: string]: any }
}

export class HttpError extends ApplicationError<HttpsErrorContent> {
  private static readonly _statusCode = 400
  private readonly _code: number
  private readonly _logging: boolean
  private readonly _context: { [key: string]: any }

  constructor(params?: HttpErrorParams) {
    const { code, message, logging } = params || {}

    super(message || "Http error")
    this._code = code || HttpError._statusCode
    this._logging = logging || false
    this._context = params?.context || {}

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  get errors() {
    return [{ message: this.message, context: this._context }]
  }

  get statusCode() {
    return this._code
  }

  get logging() {
    return this._logging
  }
}

export class NotFoundError extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 404, message: "Not found", ...params })
  }
}

export class BadRequestError extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 400, message: "Bad request", ...params })
  }
}

export class UnauthorizedError extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 401, message: "Unauthorized", ...params })
  }
}

export class ForbiddenError extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 403, message: "Forbidden", ...params })
  }
}

export class InternalServerError extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 500, message: "Internal server error", ...params })
  }
}

export class NotImplemented extends HttpError {
  constructor(params?: HttpErrorParams) {
    super({ code: 501, message: "Not implemented", ...params })
  }
}