import { NextFunction, Request, Response } from "express"
import { HttpError } from "../../internal/http"

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    const { statusCode, errors, stack } = error

    if (error.logging) {
      console.error(JSON.stringify({
        code: statusCode,
        errors: errors,
        stack: stack,
      }, null, 2))
    }

    return res.status(statusCode).send({ errors })
  }
}
