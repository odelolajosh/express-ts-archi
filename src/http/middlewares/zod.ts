import { HttpError } from '@/internal/http'
import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

/**
 * Middleware to validate request body, query or params
 * @param schema - Zod schema
 * @param field - Field to validate
 */
export const validateRequest = (schema: ZodSchema<any>, field: "body" | "query" | "params" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[field] = schema.parse(req[field])
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const message = `Request ${field} is invalid`
        throw new HttpError({ message, code: 422, logging: true, context: error.errors })
      }
    }
  }
