import { NextFunction, Request, Response } from "express"
import { ApplicationError } from "@/internal/error"
import { logger } from "@/internal/logger"

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
      logger.error(error.message, { stack, errors, url: req.url })
    }

    return res.status(statusCode).send({ errors })
  }
}
