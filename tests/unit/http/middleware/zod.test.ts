import { validateRequest } from "@/http/middlewares/zod"
import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { vi } from "vitest"
import { HttpError } from "@/internal/http"

describe('validateRequest', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = vi.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: vi.fn().mockReturnThis()
    }
  })

  it('should call next function if request body is valid', async () => {
    mockRequest.body = { name: 'John Doe' }
    const schema = z.object({
      name: z.string()
    })

    await validateRequest(schema, 'body')(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(nextFunction).toHaveBeenCalled()
  })

  it('should throw an error if request body is invalid', async () => {
    mockRequest.body = { name: 123 }
    const schema = z.object({
      name: z.string()
    })

    expect(async () =>
      await validateRequest(schema, 'body')(mockRequest as Request, mockResponse as Response, nextFunction)
    ).rejects.toThrow(HttpError)
  })

  it('should call next function if request query is valid', async () => {
    mockRequest.query = <any>{ page: 1 }
    const schema = z.object({
      page: z.number()
    })

    await validateRequest(schema, 'query')(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(nextFunction).toHaveBeenCalled()
  })
})
