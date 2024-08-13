import { NextFunction, Request, Response } from "express"
import { ApplicationError } from "@/internal/error"

/**
 * Application error handler.
 * This function will handle all errors thrown by the application.
 * 
 * @param error
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApplicationError) {
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
